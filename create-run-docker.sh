#!/usr/bin/env bash
docker build -t temp_movies-api -f Dockerfile .
echo "Done creating docker image"

docker run -it  -p 3000:3000/tcp --name cheap-movie-api --rm -d temp_movies-api
echo "Done starting docker container cheap-movie-api"