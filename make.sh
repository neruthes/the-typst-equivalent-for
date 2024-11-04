#!/bin/bash

case $1 in
    '')
        ./make.sh db/
        ;;
    db | db/ )
        node src/makepages.js
        ;;
    new )
        git add db &&
        git commit -m 'Add new entry'
        ;;
esac
