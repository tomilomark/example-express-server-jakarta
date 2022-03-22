FROM node:16-alpine AS base

WORKDIR /app
RUN npm install -g npm@7
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "start"]
