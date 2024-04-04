#!/bin/bash

originDir=$(pwd)
cd "$(dirname -- "${BASH_SOURCE}")"

#now at util

cd ../pagehelper
yarn build

if [[ ! -d ../pagehelper-docs/dist ]]; then
	mkdir ../pagehelper-docs/dist
fi

cp -f ./dist/bundle.min.es.js ../pagehelper-docs/dist/
cp -f ./dist/bundle.min.iife.js ../pagehelper-docs/dist/

cd $originDir

# if parameter 1 is equal to 'do', then do the following
if [[ "$1" == 'do' ]];then
  source secret.sh
  yarn semantic-release --no-ci
fi
