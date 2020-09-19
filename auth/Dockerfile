# Specify a base image
FROM node:alpine

WORKDIR /app

# Install some dependencies
COPY package.json .
RUN npm install --only=prod

COPY . .
# Default command
CMD ["npm", "start"]