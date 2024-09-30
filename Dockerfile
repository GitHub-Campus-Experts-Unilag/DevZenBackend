FROM node:18

WORKDIR /build

COPY package*.json ./
RUN npm install typescript
RUN npm install

COPY . .

EXPOSE 4000/tcp

CMD [ "npm","run", "start:dev" ]