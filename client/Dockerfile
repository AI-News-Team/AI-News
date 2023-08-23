FROM node:18-alpine
WORKDIR /app/client
COPY ./client/package*.json ./
RUN npm ci
COPY ./client .
RUN mkdir -p /app/shared
COPY ./shared /app/shared
EXPOSE $CLIENT_PORT
CMD ["npm", "run", "dev"]