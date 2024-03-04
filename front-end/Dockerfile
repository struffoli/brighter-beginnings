FROM node:latest
WORKDIR /app
COPY package.json package-lock.json yarn.lock /app/
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]