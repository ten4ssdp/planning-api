# Postgre
FROM postgres as db

EXPOSE 5432


# Node
FROM node:latest

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

