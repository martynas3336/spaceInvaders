FROM node:14

WORKDIR /spaceInvaders

COPY package*.json ./

RUN npm install

COPY . .

CMD ["tail", "-f", "/dev/null"]
