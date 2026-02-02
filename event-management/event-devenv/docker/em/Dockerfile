# Development Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy Jest configuration files (needed for running tests)
COPY jest.config.js jest.setup.js ./

# Expose port
EXPOSE 3000

# Use nodemon for hot reload
CMD ["npm", "run", "dev"]
