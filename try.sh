#!/bin/bash

if ! [[ $(git branch | grep ^\*) == *"gh-pages"* ]]; then
    echo "yep"
else
    exit
fi

echo "okay"
