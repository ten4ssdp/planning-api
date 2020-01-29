# Stage 1
FROM node:latest as build

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8081

CMD ["npm", "run", "dev"]