#!/usr/bin/env bash

set -e
touch .npmrc
echo 'strict-ssl=true' >> .npmrc
echo 'registry=https://${NPM_REGISTRY_ADDRESS}' >> .npmrc
echo '//${NPM_REGISTRY_ADDRESS}/:_authToken="${NPM_REGISTRY_TOKEN}"' >> .npmrc

npm install
npm publish
