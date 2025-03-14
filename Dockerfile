# Build stage
FROM node:alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build Next.js for production
RUN npm run build

# Production stage
FROM node:alpine
WORKDIR /app

# Copy built files from the builder
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port 3000 for Next.js
EXPOSE 3000

# Use `next start` instead of `npm start`
CMD ["npx", "next", "start"]
