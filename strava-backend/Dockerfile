FROM node:lts-alpine

WORKDIR /usr/api
COPY package*.json ./


RUN npm install

COPY . .

EXPOSE 3000

RUN npm run build

CMD [ "node", "dist/index.js" ]