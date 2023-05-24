FROM node:16-alpine as builder
WORKDIR /app
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install

ARG NODE_ENV
COPY . .
RUN npm run build

FROM nginx:alpine

WORKDIR /var/www
COPY --from=builder /app/dist .
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]