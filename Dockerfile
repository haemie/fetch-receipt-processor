# first stage for running tests with devdependencies
FROM node:bookworm-slim AS dev
WORKDIR /app
COPY . .
RUN npm i
RUN npm test

# second stage for production without devdependencies
FROM node:bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dev /app/package.json .
COPY --from=dev /app/package-lock.json .
RUN npm ci
COPY . .
CMD [ "node", "server.js" ]
