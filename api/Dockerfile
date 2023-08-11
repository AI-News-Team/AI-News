FROM node:18-alpine
WORKDIR /app/api
COPY ./api/package*.json ./
RUN npm ci
COPY ./api .
RUN mkdir -p /app/shared
COPY ./shared /app/shared
EXPOSE $API_PORT
CMD ["npm", "run", "dev"]
