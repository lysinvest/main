# main.module
19/09/17 11:22


# fonctionnement avec Dockerfile
sudo docker build -t main/module:1.0.0 .
sudo docker run --name module -d -p 7000:7000 main/module:1.0.0
sudo docker exec -it CONTAINER_ID bash

# config
- Node.js / Version v6.11.3 / 
  verify version (node --version)
- npm / Version 5.4.2
  verify version (npm --version)
  update version (npm install npm -g)

# installation
npm install

# compilation Typescript
npm run tsc

# compilation Angular
npm run ngc

# test coding style
npm run lint

# test karma
npm run test

# debugage
npm run start 

# compilation JIT
npm run build

# compilation AOT
npm run build:aot

# execution JIT
npm run server

# execution AOT
npm run server:aot


