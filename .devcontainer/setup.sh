#!/bin/bash

# Runs once after devcontainer is created

figlet "1-time Setup"
echo "Running one-time setup for you :)"

# Create .env files if it doesn't exist
if [ ! -f ./client/.env ]; then
    cp ./client/.env.example ./client/.env
fi
if [ ! -f ./server/.env ]; then
    cp ./server/.env.example ./server/.env
fi

# Give editor intellisense
(cd server && POETRY_VIRTUALENVS_CREATE=false poetry install)
(cd client && npm install)

# Build containers so less waiting
docker compose pull
docker compose build --no-cache