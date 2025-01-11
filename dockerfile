FROM node:12-alpine as desbravadorback
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app 
RUN npm install --silent
COPY . .
RUN apk add --no-cache tzdata
ENV TZ America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
CMD [ "node", "server.js" ]