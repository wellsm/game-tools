# Stage 1: Build Vite application
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Generate Icons
RUN npm run generate-pwa-assets

# Build the Vite app
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build files to Nginx's HTML directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
