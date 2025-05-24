# Gunakan image ringan Node.js Alpine
FROM node:20-alpine

# Set direktori kerja
WORKDIR /app

# Salin dan install dependency
COPY package*.json ./
RUN npm install

# Salin semua file
COPY . .

# Port untuk Cloud Run
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "index.js"]
