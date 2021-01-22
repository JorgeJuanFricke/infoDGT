# DOCKER FILE PAR BUSCADGT
FROM node:latest
WORKDIR /app
COPY package.json ./
RUN yarn install
COPY . .

CMD node bin/www.js


