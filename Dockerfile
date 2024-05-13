# Stage 1: Build the application
FROM node:20-alpine as builder

# Set the working directory in the docker image
WORKDIR /api

# Only copy package.json and possibly yarn.lock if you have it
COPY package.json ./
COPY yarn.lock* ./

# Install dependencies, ensuring the lock file isn't updated
RUN yarn install --pure-lockfile

# Copy the rest of the application
COPY . .

# Build docs
RUN yarn api-doc:generate

# Build the application
RUN yarn run build

# Stage 2: Setup the production image
FROM node:20-alpine

# Set the working directory in the docker image
WORKDIR /api

# Install necessary build dependencies for native modules
RUN apk add --no-cache python3 make g++

# Copy necessary files from the builder stage
COPY --from=builder /api/node_modules ./node_modules
COPY --from=builder /api/package.json ./package.json
COPY --from=builder /api/dist ./dist

# Rebuild argon2 with node-pre-gyp to match the alpine linux environment
RUN npx @mapbox/node-pre-gyp rebuild -C node_modules/argon2

# Expose the required ports
EXPOSE 3000

# Command to run the application when the docker container starts
CMD ["yarn", "run", "start:prod"]
