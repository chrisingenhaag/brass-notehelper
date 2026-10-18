FROM node:24-alpine

WORKDIR /app

COPY build/ /app/
COPY package*.json /app/

RUN npm ci --omit=dev --ignore-scripts

EXPOSE 3000

CMD ["node", "./index.js"]