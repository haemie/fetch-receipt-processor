# first stage for running tests with devdependencies
FROM node:bullseye-slim AS test
WORKDIR /app
COPY . .
RUN npm i 
EXPOSE 3000
CMD [ "node", "server.js" ]