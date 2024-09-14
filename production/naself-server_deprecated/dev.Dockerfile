###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:20-alpine

# Create app directory
WORKDIR /app
RUN chown -R node:node /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# Copying this first prevents re-running npm install on every code change.
COPY --chown=node:node package*.json ./

RUN npm install

# Use the node user from the image (instead of the root user)
USER node

VOLUME [ "/data" ]
VOLUME [ "/app" ]

# Start the server using the production build
CMD [ "npm", "run", "start:dev" ]