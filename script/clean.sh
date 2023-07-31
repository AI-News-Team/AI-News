#!/bin/bash
docker-compose \
  --volumes \
  --rmi all \
  --env-file virtual.env \
  down