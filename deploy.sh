#!/bin/bash
yarn build

# 压缩
rm -f dist.zip
zip dist.zip dist/

# send dist.zip
sftp ubuntu-linux << EOF
  put /Users/cheng/Github/webpack-learn/dist.zip /home/cheng
EOF

# send dist.zip
ssh ubuntu-linux << EOF
  touch 1.txt      
EOF