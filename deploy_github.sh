#! /bin/sh
VERSION='0.2'
#VERSION=$1
GH_PAGES_FOLDER='gh-pages1'
mkdir $GH_PAGES_FOLDER 
git clone --depth 1 -b gh-pages --single-branch https://github.com/GavinHome/AvigatorFlow.git $GH_PAGES_FOLDER
cd $GH_PAGES_FOLDER

# build version folder
mkdir $VERSION
rm -rf *.js *.css *.map *.html *.ico *.json *.txt static css fonts img js
rm -rf $VERSION/**
cp -rf ../dist/** .
cp -rf ../dist/** $VERSION/

echo "deploy gh-pages $VERSION"

echo "404" >> 404.html
echo "404" >> $VERSION/404.html

git add .
git commit -m "deploy gh-pages $VERSION"
git push origin gh-pages
echo "deploy successful version: $VERSION"