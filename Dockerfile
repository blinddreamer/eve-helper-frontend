# Build stage
FROM node:alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the Next.js app
RUN npm run build

# Production stage: Nginx
FROM nginx:alpine

# Copy custom Nginx config to the container
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built Next.js app from the build stage
COPY --from=builder /app/.next /usr/share/nginx/html/.next
COPY --from=builder /app/public /usr/share/nginx/html/public

# Expose port 82 to access the app
EXPOSE 82

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
