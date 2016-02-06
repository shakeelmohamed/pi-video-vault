docker rm rpi-media-express
docker run -it --rm -p 80:80 -v $RPI_MEDIA:/media --name rpi-media-express rme
