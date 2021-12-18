# syntax=docker/dockerfile:experimental
FROM node:12 as source
LABEL maintainer="taewankung@gmail.com"

WORKDIR /app/
COPY package.json yarn.lock /app/
RUN yarn install

# start from scratch and copy dependency
FROM node:12
LABEL maintainer="taewankung@gmail.com"
WORKDIR /app/

COPY --from=source /app/node_modules /app/node_modules
COPY . /app/
RUN yarn build

ENV NODE_ENV=production

EXPOSE 3777

CMD node /app/dist/app.js
