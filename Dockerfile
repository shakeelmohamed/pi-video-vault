FROM hypriot/rpi-node:latest

# The application's default port
EXPOSE 80

WORKDIR /src
COPY . /src
RUN cd /src; npm install --production
CMD ["npm", "start"]

ENV RPI_MEDIA="/media"
ENV PORT=80
VOLUME ${RPI_MEDIA}

RUN ln -s ${RPI_MEDIA} /src/public/media
