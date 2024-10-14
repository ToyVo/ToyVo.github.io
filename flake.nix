{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    crate2nix.url = "github:nix-community/crate2nix";
    devshell = {
      url = "github:numtide/devshell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  nixConfig = {
    extra-trusted-public-keys = "eigenvalue.cachix.org-1:ykerQDDa55PGxU25CETy9wF6uVDpadGGXYrFNJA3TUs=";
    extra-substituters = "https://eigenvalue.cachix.org";
    allow-import-from-derivation = true;
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
      crate2nix,
      devshell,
      ...
    }:
    flake-parts.lib.mkFlake { inherit inputs; } {
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];

      imports = [
        devshell.flakeModule
      ];

      perSystem =
        {
          self',
          system,
          pkgs,
          lib,
          config,
          ...
        }:
        let
          cargoToml = builtins.fromTOML (builtins.readFile ./Cargo.toml);
          rev = self.shortRev or self.dirtyShortRev or "dirty";
          generatedCargoNix = crate2nix.tools.${system}.generatedCargoNix {
            name = "portfolio";
            src = ./.;
          };
          cargoNix = pkgs.callPackage "${generatedCargoNix}/default.nix" {
            buildRustCrateForPkgs =
              pkgs:
              pkgs.buildRustCrate.override {
                defaultCrateOverrides = pkgs.defaultCrateOverrides // {
                  portfolio = attrs: {
                    version = "${cargoToml.package.version}-${rev}";
                    buildInputs =
                      with pkgs.darwin.apple_sdk.frameworks;
                      lib.optionals pkgs.stdenv.isDarwin [
                        SystemConfiguration
                        CoreServices
                      ];
                    nativeBuildInputs = with pkgs; [
                      libiconv
                      pkg-config
                    ];
                  };
                };
              };
          };
        in
        {
          packages.default = cargoNix.rootCrate.build;
          devshells.default = {
            imports = [
              "${devshell}/extra/language/c.nix"
              # "${devshell}/extra/language/rust.nix"
            ];

            env = [
              {
                name = "RUST_LOG";
                value = "portfolio=trace";
              }
              {
                name = "RUST_SRC_PATH";
                value = "${pkgs.rustPlatform.rustLibSrc}";
              }
            ];

            commands = [
              {
                package = pkgs.nodejs;
              }
              {
                package = pkgs.cargo;
              }
              {
                package = pkgs.trunk;
              }
            ];

            packages =
              with pkgs;
              [
                cargo-watch
                clippy
                pkg-config
                rust-analyzer-unwrapped
                rustPlatform.bindgenHook
                rustc
                rustfmt
                systemfd
                llvmPackages.bintools-unwrapped
              ]
              ++ lib.optionals stdenv.isDarwin [ darwin.apple_sdk.frameworks.SystemConfiguration ];

            language.c = {
              libraries = lib.optional pkgs.stdenv.isDarwin pkgs.libiconv;
            };
          };
        };
    };
}
