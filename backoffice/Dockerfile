FROM node:14.16.0-alpine3.13 AS build-stage
WORKDIR /app
COPY package*.json /app/
COPY . /app/
RUN  npm install
RUN npm run build:production
FROM nginx:1.13.12-alpine 
COPY --from=build-stage /app/build /user/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
ENTRYPOINT [ "nginx" ,"-g","daemon off;" ]

