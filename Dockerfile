FROM node:16.13.1-buster as build

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

RUN yarn 
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]