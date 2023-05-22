#!/bin/bash
cat ./database/.env > ./.env
echo >> ./.env
cat ./server/.env >> ./.env
echo >> ./.env
cat ./client/.env >> ./.env
echo >> ./.env
cat ./search/.env >> ./.env
