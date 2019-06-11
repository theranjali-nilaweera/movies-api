#!/usr/bin/env bash
echo "Change nvm"
source ~/.profile
nvm use || { echo "Error changing node version"; exit 1; }

echo "Starting up local movie API"
npm run start-serve || { echo "Error running local movie API"; exit 1; }
