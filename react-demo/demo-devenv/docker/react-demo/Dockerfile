# Development Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY package*.json ./

# Install all dependencies (including dev)
RUN npm ci

# Expose port (Vite default port)
EXPOSE 5173

# Use vite dev server for hot reload
# --host 0.0.0.0 allows access from outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
