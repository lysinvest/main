FROM node:6.11.4

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
RUN npm run build:aot

EXPOSE 7000
CMD [ "npm", "run", "server:aot" ]