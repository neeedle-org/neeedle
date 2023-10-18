#!/bin/bash

DEST="public/libs/extraRpcs.js"

curl https://raw.githubusercontent.com/DefiLlama/chainlist/main/constants/extraRpcs.js -o "${DEST}"
sed -i -z -E "s/(.|\n)*(export const extraRpcs = \{(.|\n)*\};)(.|\n)*/\2/gm" "${DEST}"
sed -i "s/tracking.*//g" "${DEST}"
