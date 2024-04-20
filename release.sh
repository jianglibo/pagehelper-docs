#!/bin/bash

originDir=$(pwd)
cd "$(dirname -- "${BASH_SOURCE}")"

bash ../pagehelper/deploy-to-docs.sh
bash ../my-codemirror/deploy-to-docs.sh
bash ../mini-codeium/deploy-to-docs.sh

# #now at util

# cd ../pagehelper
# yarn build

# if [[ ! -d ../pagehelper-docs/dist ]]; then
# 	mkdir ../pagehelper-docs/dist
# fi

# cp -f ./dist/bundle.min.es.js ../pagehelper-docs/dist/
# cp -f ./dist/bundle.min.iife.js ../pagehelper-docs/dist/

# if [[ ! -d ../pagehelper/forever ]]; then
#   mkdir ../pagehelper/forever
# fi

# # remove all files it's name contains .hashed.
# find ../pagehelper-docs/forever -name "*.hashed.*" -exec rm -f {} \;

# hash=$(md5sum ../pagehelper/dist/bundle.min.es.js | cut -d ' ' -f 1)
# cp -f ./dist/bundle.min.es.js ../pagehelper-docs/forever/bundle.min.es.hashed.$hash.js

# # update ../pagehelper-docs/_data/file_hashes.yml with content: bundle_es: $hash
# echo "bundle_es: $hash" > ../pagehelper-docs/_data/file_hashes.yml

cd $originDir

# if parameter 1 is equal to 'do', then do the following
if [[ "$1" == 'do' ]];then
  source secret.sh
  yarn semantic-release --no-ci
fi
