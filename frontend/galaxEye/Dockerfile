# nodejs runtime for base image
FROM node:20

# working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the React application for production
RUN npm run build

# Set the environment variable to serve the app
ENV PORT=3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Command to run the app using a static file server
CMD ["npx", "serve", "dist"]
 
