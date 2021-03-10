FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./

RUN yarn

COPY . . 

EXPOSE 8690

CMD yarn start