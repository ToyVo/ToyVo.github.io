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
            wasm-bindgen-cli = pkgs.wasm-bindgen-cli.override {
              version = "0.2.100";
              hash = "sha256-3RJzK7mkYFrs7C/WkhW9Rr4LdP5ofb2FdYGz1P7Uxog=";
              cargoHash = "sha256-tD0OY2PounRqsRiFh8Js5nyknQ809ZcHMvCOLrvYHRE=";
            };
            dioxus-cli = pkgs.dioxus-cli.overrideAttrs (drv: rec {
              version = "0.6.1";
              src = pkgs.fetchCrate {
                inherit version;
                pname = drv.pname;
                hash = "sha256-mQnSduf8SHYyUs6gHfI+JAvpRxYQA1DiMlvNofImElU=";
              };
              cargoDeps = drv.cargoDeps.overrideAttrs (
                lib.const {
                  name = "${drv.cargoDeps.name}-vendor";
                  inherit src;
                  outputHash = "sha256-QiGnBoZV4GZb5MQ3K/PJxCfw0p/7qDmoE607hlGKOns=";
                }
              );
              checkFlags = drv.checkFlags ++ [ "--skip=wasm_bindgen::test" ];
            });
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
                  ${
                    if pkgs.stdenv.isDarwin then
                      ''
                        export HOME="$PWD/.home"
                        mkdir -p ".home/Library/Application Support/dioxus/wasm-bindgen"
                        ln -s ${lib.getExe wasm-bindgen-cli} ".home/Library/Application Support/dioxus/wasm-bindgen/wasm-bindgen-${wasm-bindgen-cli.version}"
                      ''
                    else
                      ''
                        export XDG_DATA_HOME="$PWD/.share"
                        mkdir -p .share/dioxus/wasm-bindgen
                        ln -s ${lib.getExe wasm-bindgen-cli} .share/dioxus/wasm-bindgen/wasm-bindgen-${wasm-bindgen-cli.version}
                      ''
                  }
                  dx build --release --verbose --trace
                '';
                installPhase = ''
                  mkdir -p $out
                  cp -r target/dx/$pname/release/web/public/* $out
                  cp $src/CNAME $out
                '';
                cargoLock.lockFile = ./Cargo.lock;
              };
          };
          devShells.default = pkgs.mkShell {
            shellHook = ''
              export RUST_LOG="portfolio=trace"
              export RUST_SRC_PATH=${pkgs.rustPlatform.rustLibSrc}
            '';
            buildInputs = lib.optionals pkgs.stdenv.isDarwin [
              pkgs.darwin.apple_sdk.frameworks.SystemConfiguration
            ];
            nativeBuildInputs = with pkgs; [
              self'.packages.dioxus-cli
              self'.packages.rustToolchain
              pkg-config
              rustPlatform.bindgenHook
              libiconv
              cargo-watch
              systemfd
            ];
          };
        };
    };
}
