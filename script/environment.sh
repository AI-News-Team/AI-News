#!/bin/bash
cat ./database/.env > ./.env
echo \n >> ./.env
cat ./server/.env >> ./.env
echo \n >> ./.env
cat ./client/.env >> ./.env
echo \n >> ./.env
cat ./search/.env >> ./.env
