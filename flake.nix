{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-parts = {
      url = "github:hercules-ci/flake-parts";
      inputs.nixpkgs-lib.follows = "nixpkgs";
    };
    devshell = {
      url = "github:numtide/devshell";
      inputs.nixpkgs.follows = "nixpkgs";
    };
    rust-overlay.url = "github:oxalica/rust-overlay";
  };

  nixConfig = {
    extra-substituters = [
      "https://cache.nixos.org"
      "https://nix-community.cachix.org"
      "https://toyvo.cachix.org"
    ];
    extra-trusted-public-keys = [
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
      "nix-community.cachix.org-1:mB9FSh9qf2dCimDSUo8Zy7bkq5CX+/rkCWyvRCYg3Fs="
      "toyvo.cachix.org-1:s++CG1te6YaS9mjICre0Ybbya2o/S9fZIyDNGiD4UXs="
    ];
    allow-import-from-derivation = true;
  };

  outputs =
    inputs@{
      self,
      nixpkgs,
      flake-parts,
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
        flake-parts.flakeModules.easyOverlay
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
        {
          _module.args.pkgs = import inputs.nixpkgs {
            inherit system;
            overlays = [
              inputs.rust-overlay.overlays.default
            ];
          };
          formatter = pkgs.nixfmt-rfc-style;

          packages = rec {
            rustToolchain = (
              pkgs.rust-bin.stable.latest.default.override {
                extensions = [
                  "rust-src"
                  "rust-analyzer"
                  "clippy"
                ];
                targets = [ "wasm32-unknown-unknown" ];
              }
            );
            dioxus-cli = pkgs.callPackage ./dioxus-cli.nix {};
            default =
              let
                cargoToml = builtins.fromTOML (builtins.readFile ./Cargo.toml);
                rev = toString (self.shortRev or self.dirtyShortRev or self.lastModified or "unknown");
              in
              pkgs.rustPlatform.buildRustPackage {
                pname = cargoToml.package.name;
                version = "${cargoToml.package.version}-${rev}";
                src = ./.;
                strictDeps = true;
                nativeBuildInputs = with pkgs; [
                  dioxus-cli
                  rustToolchain
                  openssl
                  libiconv
                  pkg-config
                  wasm-bindgen-cli
                  binaryen
                  rustPlatform.bindgenHook
                ];
                buildInputs =
                  with pkgs;
                  [
                    openssl
                    libiconv
                    pkg-config
                  ]
                  ++ lib.optionals pkgs.stdenv.isDarwin [
                    pkgs.darwin.apple_sdk.frameworks.SystemConfiguration
                  ];
                buildPhase = ''
                  dx build --release --platform web --verbose --trace
                '';
                installPhase = ''
                  mkdir -p $out
                  cp -r target/dx/$pname/release/web/public/* $out
                  cp $src/CNAME $out
                  cp $out/index.html $out/404.html
                '';
                cargoLock.lockFile = ./Cargo.lock;
              };
          };
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
                package = self'.packages.dioxus-cli;
              }
            ];

            packages =
              with pkgs;
              [
                self'.packages.dioxus-cli
                self'.packages.rustToolchain
                pkg-config
                rustPlatform.bindgenHook
                cargo-watch
                systemfd
              ]
              ++ lib.optionals stdenv.isDarwin [ darwin.apple_sdk.frameworks.SystemConfiguration ];

            language.c = {
              libraries = lib.optional pkgs.stdenv.isDarwin pkgs.libiconv;
            };
          };
        };
    };
}
