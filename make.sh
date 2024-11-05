#!/bin/bash

case $1 in
    '')
        ./make.sh db/
        ;;
    db | db/ )
        find docs/db -name '*.html' | grep -v 'docs/db/\.' | while read -r html_fn; do
            mdfn=db/"$(basename "$html_fn" | sed 's/.html$//')".md
            if [[ ! -e "$mdfn" ]]; then
                rm "$html_fn"
            fi
        done
        node src/makepages.js
        ;;
    new )
        git add db &&
        git commit -m 'Add new entry'
        ;;
esac
