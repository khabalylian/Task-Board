FROM node:18.18.0
WORKDIR /ReactApp/server
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start"]