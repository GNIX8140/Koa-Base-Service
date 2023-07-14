FROM node:16-alpine3.16

WORKDIR /app

COPY . .

EXPOSE [80, 443]

RUN npm install

CMD npm run serve