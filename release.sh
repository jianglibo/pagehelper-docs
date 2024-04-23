#!/bin/bash

originDir=$(pwd)
cd "$(dirname -- "${BASH_SOURCE}")"

if [[ "$1" == 'ph' ]]; then
  bash ../pagehelper/deploy-to-docs.sh
  cd $originDir
  exit 0
fi

bash ../pagehelper/deploy-to-docs.sh
bash ../my-codemirror/deploy-to-docs.sh
bash ../mini-codeium/deploy-to-docs.sh
cd $originDir

# if parameter 1 is equal to 'do', then do the following
if [[ "$1" == 'do' ]]; then
  source secret.sh
  yarn semantic-release --no-ci
fi
