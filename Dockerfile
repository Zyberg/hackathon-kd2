# Build the API:
FROM node:lts-alpine as build_api

WORKDIR /src

COPY backend/prisma ./prisma/
COPY backend/package*.json ./
RUN npm install

COPY backend/. .
# RUN npm test
#RUN npm prune --production




# build Quasar app:
FROM node:lts-alpine as build_app

RUN npm i -g @quasar/cli

WORKDIR /src

COPY frontend/package*.json ./
RUN npm install

COPY frontend .
RUN quasar build




# Copy results from both places into production container:
FROM node:lts-alpine

WORKDIR /app
COPY --from=build_api /src ./
COPY --from=build_app /src/dist/spa ./public

ENV NODE_ENV production
ENV PORT 3000
EXPOSE 3000

CMD ["npm", "start"]