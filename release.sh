#!/bin/bash

pwd

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

ls -l dist
yarn semantic-release --no-ci
