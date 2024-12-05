FROM node:19.9.0-alpine

WORKDIR /app

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]