# Stage extra pra buildar aplicação
FROM node:latest as node

# Copiando arquivos fonte
WORKDIR /app
COPY . .

# Buildando aplicação
RUN npm install && \
    npm run build

# Stage principal com nginx
FROM nginx:alpine

# Copiando aplicação do stage de build
RUN mkdir -p  /var/www/ui
COPY --from=node /app/dist/ui /var/www/ui/

# Setando configuração personalizada do nginx
COPY ./nginx/nginx.conf ./etc/nginx/conf.d/default.conf