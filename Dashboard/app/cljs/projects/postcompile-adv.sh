#!/bin/bash

OUT_ROOT=../../../../GAE/war/admin/frames/

if [[ $* == Successfully* ]]; then
    echo "Copying 'projects/' files to ../GAE/war/admin"
    cp projects.js ${OUT_ROOT}projects.js
    cp projects-adv.html ${OUT_ROOT}projects.html
    echo "Done."
fi
