# Gunakan image node
FROM node:20-alpine

# Set direktori kerja di container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependency
RUN npm install

# Salin seluruh project ke container
COPY . .

# Jalankan app (React default port 3000)
EXPOSE 3000

# Jalankan React App
CMD ["npm", "start"]
