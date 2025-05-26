FROM node:20-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all backend source code
COPY . .

# Copy .env (dari cloudbuild.yaml step gsutil)
COPY .env .env

# Set environment
ENV NODE_ENV=production

# Expose port for Cloud Run
EXPOSE 8080

# Start backend
CMD ["node", "index.js"]
