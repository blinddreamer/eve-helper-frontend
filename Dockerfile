# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first to install dependencies
COPY package*.json ./

# Install production dependencies
RUN npm install --production

# Copy the rest of the application files into the container
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port the app will run on (default is 3000)
EXPOSE 3000

# Start the Next.js app
CMD ["npm", "start"]
