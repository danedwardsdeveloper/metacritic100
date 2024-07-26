FROM node:22-alpine
WORKDIR /dist
COPY package*.json ./
RUN npm install
COPY dist/ ./dist/
EXPOSE 3000
CMD ["node", "dist/server/server.js"]