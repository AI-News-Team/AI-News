#!/bin/bash
python -m \
  flask \
  --app main.py run \
  --debug \
  -h $SEARCH_ENGINE_HOST \
  -p $SEARCH_ENGINE_PORT
