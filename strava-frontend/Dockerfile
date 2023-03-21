# Develop stage
FROM node:lts-alpine as develop-stage

WORKDIR /usr/app

COPY package*.json ./

RUN yarn global add @quasar/cli

COPY . .


# Build stage
FROM develop-stage as build-stage

RUN yarn

RUN quasar build

# Production stage
FROM nginx:lts-alpine as production-stage

COPY --from=build-stage /usr/app/dist/spa /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
