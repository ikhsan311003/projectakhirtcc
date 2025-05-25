# Tahap 1: Build React app
FROM node:20-alpine as build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Tahap 2: Gunakan Nginx untuk serve hasil build
FROM nginx:alpine

# Copy hasil build ke folder default Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 untuk Cloud Run
EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
