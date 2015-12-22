FROM hypriot/rpi-node:latest

# The application's default port
EXPOSE 3000

WORKDIR /src
COPY . /src
RUN cd /src; npm install --production
CMD ["npm", "start"]
