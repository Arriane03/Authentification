# Dockerfile
FROM node:24-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --force --legacy-peer-deps

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]