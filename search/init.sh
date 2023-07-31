#!/bin/bash
if [ -z ../local.env ] ; then
  echo "Unable to start search engine!"
  echo "Missing `../local.env` file ❌";
  exit 1;
fi
source ../local.env;

python -m \
  flask \
  --app main.py run \
  --host=0.0.0.0 \
  --debug \
  -h $SEARCH_HOST \
  -p $SEARCH_PORT
