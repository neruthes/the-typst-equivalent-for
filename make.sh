#!/bin/bash

case $1 in
    '')
        hello
        ;;
    db | db/ )
        node src/makepages.js
esac
