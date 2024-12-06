#!/bin/bash
VERSION=$1
echo "Updating package.json version to $VERSION"
jq --arg version "$VERSION" '.version = $version' package.json > temp.json && mv temp.json package.json
