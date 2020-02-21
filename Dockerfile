FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run apidoc

CMD ["npm", "run", "prod"]

