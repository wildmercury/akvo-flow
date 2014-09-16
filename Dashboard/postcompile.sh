#!/bin/bash

if [[ $* == Successfully* ]]; then
    echo "Copying files to ../GAE/war/admin"
    cp dashboard.js ../GAE/war/admin/dashboard.js
    cp dashboard.html ../GAE/war/admin/index.html
    cp -r out ../GAE/war/admin/
    cp -r css ../GAE/war/admin/
    cp -r static/images ../GAE/war/admin/
    cp -r static/fonts ../GAE/war/admin/
    echo "Done."
fi
