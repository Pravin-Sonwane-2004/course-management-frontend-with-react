# Stage 1: Build the app with Node
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code and build
COPY . .
RUN npm run build

# Stage 2: Serve the build with nginx
FROM nginx:alpine

# Copy built files from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 to the outside
EXPOSE 5173

# Start nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]
