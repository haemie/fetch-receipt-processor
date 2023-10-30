# first stage for running tests with devdependencies
FROM node:bookworm-slim AS dev
WORKDIR /app
COPY . .
RUN npm i
RUN npm run tsc
RUN npm test

# second stage for production without devdependencies
FROM node:bookworm-slim AS prod
WORKDIR /app
ENV NODE_ENV=production
COPY --from=dev /app/package.json .
COPY --from=dev /app/package-lock.json .
RUN npm ci
COPY . .
EXPOSE 3000
ENV PORT=3000
CMD [ "node", "dist/server.js" ]
