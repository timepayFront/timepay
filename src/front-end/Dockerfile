FROM node:16 as build-user
WORKDIR /app/user
COPY timepay-front/package.json timepay-front/yarn.lock ./
RUN yarn install
COPY timepay-front/ .
RUN yarn build

FROM node:16 as build-admin
WORKDIR /app/admin
COPY timepay-admin/package.json timepay-admin/yarn.lock ./
RUN yarn install
COPY timepay-admin/ .
RUN yarn build


FROM nginx
COPY --from=build-user /app/user/build/ /usr/share/nginx/html/app/
COPY --from=build-user /app/user/build/ /usr/share/nginx/html/
COPY --from=build-admin /app/admin/build/ /usr/share/nginx/html/admin/
