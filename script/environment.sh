#!/bin/bash
cat ./database/container.env > ./.env
echo >> ./.env
cat ./api/container.env >> ./.env
echo >> ./.env
cat ./client/container.env >> ./.env
echo >> ./.env
cat ./search/container.env >> ./.env
