# Використовуємо офіційний образ Node.js
FROM node:18.18.0
WORKDIR /ReactApp/client
COPY package.json package-lock.json ./
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
EXPOSE 3000

