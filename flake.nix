{
  description = "vo2 test shell";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = inputs@{ nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachSystem [ "x86_64-linux" ] (system:
      let pkgs = import nixpkgs { inherit system; };
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            (python311.withPackages (ps: with ps; [
              pip

              typing-extensions # https://github.com/python/typing
              packaging # https://github.com/pypa/packaging

              # Uncomment the following lines to make them available in the shell.
              # pandas
              # numpy
              # matplotlib

              pytest # https://docs.pytest.org
            ]))

            opentofu # https://opentofu.org/
            pre-commit # https://pre-commit.com/
            ruff # https://github.com/astral-sh/ruff
            create-react-app

            nodejs # https://nodejs.org/en
            nest-cli # https://nestjs.com/

            # deployment tools
            docker-compose # https://docs.docker.com/compose/
            ansible # https://docs.ansible.com/ansible/latest/index.html
          ];

          shellHook = ''
            export LD_LIBRARY_PATH=${pkgs.lib.makeLibraryPath [ pkgs.stdenv.cc.cc ]}

            export PIP_HOME=$(pwd)/pip_packages
            export PYTHONPATH="$PIP_PREFIX/${pkgs.python3.sitePackages}:$PYTHONPATH"
            export PATH="$PIP_PREFIX/bin:$PATH"
            unset SOURCE_DATE_EPOCH

            if [ ! -d ".venv" ]; then
              python -m venv .venv
            fi

            source .venv/bin/activate
            '';
        };
      });
}
