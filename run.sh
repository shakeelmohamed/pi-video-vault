docker rm rpi-media-express
docker run -it --rm -p 3000:3000 -v $RPI_MEDIA:/media --name rpi-media-express rme
