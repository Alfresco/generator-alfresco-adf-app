#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

LANG_ROOT="./i18n"

show_help() {
    echo "Usage: import-langs.sh --input NAME_FOLDER import the i18n files from a folder"
    echo ""
    echo "--input or -i to specify a folder where import the new files. (default value i18n)"
}

input_folder(){
    if [[ $# -ne 1 ]]; then
        echo "No arguments supplied. Default path for output will be used ./i18n"
    else
        LANG_ROOT="$1"
    fi
}

while [[ $1  == -* ]]; do
    case "$1" in
      -h|--help|-\?) show_help; exit 0;;
      --input|-i)  input_folder $2; shift;;
    esac
done

for d in ./app/templates/*/ ; do
  for filename in $LANG_ROOT/demo-shell/resources/i18n/*.json; do
    echo -e "\tCopying $filename to $d"
    cp -a $filename $d/resources/i18n
  done
done
