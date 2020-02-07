#!/usr/bin/env bash

set -e
touch .npmrc
echo 'strict-ssl=false' >> .npmrc
echo 'registry=http://${NPM_REGISTRY_ADDRESS}' >> .npmrc
echo '//${NPM_REGISTRY_ADDRESS}/:_authToken="${NPM_REGISTRY_TOKEN}"' >> .npmrc

npm install
npm publish
