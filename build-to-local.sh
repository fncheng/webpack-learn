#!/bin/bash

yarn build &&

rm -rf /opt/homebrew/var/vuepress/dist &&
cp -r dist /opt/homebrew/var/vuepress &&

echo "Script completed successfully!"