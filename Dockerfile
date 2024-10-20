# Use the official Node image as a base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app for production
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3000

# Start the app
CMD ["npx", "serve", "-s", "build"]
