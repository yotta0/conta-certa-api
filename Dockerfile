FROM node:20.14.0-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

ARG DATABASE_URL

RUN npx prisma generate

RUN npx prisma migrate deploy

RUN npx tsc src/seeder.ts

RUN node src/seeder.js

EXPOSE 4052

CMD ["sh", "/app/run.sh"]
