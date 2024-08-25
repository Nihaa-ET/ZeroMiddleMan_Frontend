# Use an official Node.js runtime as a parent image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Install a simple HTTP server to serve the static files
RUN npm install -g serve

# Expose port 80 to the outside world
EXPOSE 80

# Serve the build folder using "serve"
CMD ["serve", "-s", "build"]
