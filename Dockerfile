FROM node:18-alpine

WORKDIR /app

COPY build/ /app/
COPY package*.json /app/

RUN npm ci --production --ignore-scripts

EXPOSE 3000

CMD ["node", "./index.js"]