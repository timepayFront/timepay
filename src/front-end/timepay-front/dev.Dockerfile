FROM node:16 as build-user
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./

CMD ["yarn", "start"]