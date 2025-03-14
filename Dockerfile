# Step 1: Build Stage
FROM node:alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Install dependencies for Next.js
COPY package*.json ./
RUN npm install

# Copy the application code into the container
COPY . .

# Build the Next.js application (static assets, pages, etc.)
RUN npm run build

# Step 2: Production Stage (Nginx + Node.js)
FROM node:alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files to the production image
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expose the port Next.js will run on (3000 by default)
EXPOSE 3000

# Run Next.js in production mode
CMD ["npm", "start"]
