FROM node:22.16.0-bookworm

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000

CMD ["yarn", "start:prod"]
