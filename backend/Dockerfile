# Use the official Node.js 20 image
FROM node:20.16.0

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your backend server will run on
EXPOSE 5000

# Command to run the insert.js script if needed, then start the server
CMD ["bash", "-c", "node insert.js && npm start"]
