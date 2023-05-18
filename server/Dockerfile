FROM node:18-alpine
WORKDIR /app/server
COPY ./server/package*.json .
RUN npm ci
COPY ./server .
RUN mkdir -p /app/shared
COPY ./shared /app/shared
EXPOSE $API_PORT
CMD ["npm", "run", "dev"]
