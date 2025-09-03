# Multi-stage build for React + Vite app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build arguments for environment variables
ARG VITE_APP_TITLE
ARG VITE_APP_DESCRIPTION
ARG VITE_BASE_URL
ARG VITE_MAX_FILE_SIZE_MB
ARG VITE_UPLOAD_ENABLED
ARG NODE_ENV=production
ARG BUILD_PATH=dist

# Set environment variables for build
ENV VITE_APP_TITLE=${VITE_APP_TITLE}
ENV VITE_APP_DESCRIPTION=${VITE_APP_DESCRIPTION}
ENV VITE_BASE_URL=${VITE_BASE_URL}
ENV VITE_MAX_FILE_SIZE_MB=${VITE_MAX_FILE_SIZE_MB}
ENV VITE_UPLOAD_ENABLED=${VITE_UPLOAD_ENABLED}
ENV NODE_ENV=${NODE_ENV}
ENV BUILD_PATH=${BUILD_PATH}

# Build the application
RUN npm run build

# Production stage with nginx
FROM nginx:alpine

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]