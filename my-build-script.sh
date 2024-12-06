#!/bin/bash

# Задаємо нову версію з параметрів
VERSION=$1

# Оновлюємо версію у package.json
jq --arg version "$VERSION" '.version = $version' package.json > temp.json && mv temp.json package.json