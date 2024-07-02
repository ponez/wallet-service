FROM node:20-bullseye

WORKDIR /usr/src/app

COPY . .

RUN npm install --legacy-peer-deps

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
