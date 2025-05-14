FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma db pull
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
