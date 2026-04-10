# Etapa 1: Build de React
FROM node:20-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env.docker .env
RUN npm run build

# Etapa 2: Nginx
FROM nginx:alpine

# Limpiar carpeta default
RUN rm -rf /usr/share/nginx/html/*

# Copiar build de React
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]