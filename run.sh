docker rm pi-video-vault
docker run -it --rm -p 80:80 -v $PVV_MEDIA:/media --name pi-video-vault pvv
