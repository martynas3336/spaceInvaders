FROM node:12

WORKDIR /spaceInvaders

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "start"]