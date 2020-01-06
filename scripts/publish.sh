#!/usr/bin/env bash

set -e
touch ./dist/package/.npmrc
echo 'strict-ssl=false' >> ./dist/package/.npmrc
echo 'registry=http://${NPM_REGISTRY_ADDRESS}' >> ./dist/package/.npmrc
echo '//${NPM_REGISTRY_ADDRESS}/:_authToken="${NPM_REGISTRY_TOKEN}"' >> ./dist/package/.npmrc

npm install
npm publish
