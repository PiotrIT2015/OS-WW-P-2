# ETAP 1: Budowanie
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAP 2: Serwer Apache
FROM httpd:2.4-alpine
RUN rm -rf /usr/local/apache2/htdocs/*

# KLUCZOWA ZMIANA TUTAJ:
COPY --from=build /app/dist/ /usr/local/apache2/htdocs/

EXPOSE 80






