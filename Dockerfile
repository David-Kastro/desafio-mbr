FROM node:12.19.0-alpine3.9 AS api

WORKDIR /usr/src/app

COPY ./api/package*.json ./

RUN npm install

COPY ./api .

RUN npm run build

EXPOSE 3000

FROM node:12.19.0-alpine3.9 AS rabbitmq

WORKDIR /usr/src/app

COPY ./rabbitmq/package*.json ./

RUN npm install

COPY ./rabbitmq .

RUN npm run build

FROM node:12.19.0-alpine3.9 AS app

ENV PORT 3001

WORKDIR /usr/src/app

COPY ./app/package*.json ./

RUN npm install

COPY ./app .

RUN npm run build

EXPOSE 3001

