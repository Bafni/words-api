#!/bin/bash
VERSION=$1
jq --arg version "$VERSION" '.version = $version' package.json > temp.json && mv temp.json package.json
