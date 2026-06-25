FROM node:20-alpine

WORKDIR /app

# Install dependencies first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy application source
COPY . .

# Ensure uploads directory exists
RUN mkdir -p uploads

EXPOSE 3001

CMD ["npx", "nodemon", "--watch", "src", "src/server.js"]
