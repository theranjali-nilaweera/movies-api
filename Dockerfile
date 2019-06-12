FROM node:10.16

RUN echo 'moved to path app'

WORKDIR /app
COPY package*.json tsconfig.json ./

RUN npm install --quiet

RUN echo $PWD

RUN rm -fr lib/*

COPY . .

RUN npm run ts-clear

EXPOSE 3000

CMD npm run start-serve
