FROM hypriot/rpi-node:latest

# The application's default port
EXPOSE 3000

WORKDIR /src
COPY . /src
RUN cd /src; npm install --production
CMD ["npm", "start"]

ENV RPI_MEDIA="/media"
VOLUME ${RPI_MEDIA}

RUN ln -s ${RPI_MEDIA} /src/public/media
