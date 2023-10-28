FROM node:16 AS build

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY videos ./videos

COPY src ./src

RUN npm install --verbose

CMD ["npm", "start"]

