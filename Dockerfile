FROM node:20.14.0-bookworm

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .


EXPOSE 4052

CMD ["bash", "/app/run.sh"]
