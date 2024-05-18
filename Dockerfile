FROM node:18.14.0
WORKDIR /app
COPY package*.json ./
# Run command in Virtual directory
ENV NPM_CONFIG_LOGLEVEL error
RUN npm cache clean --force
RUN npm ci

COPY . .
ARG configuration=development
RUN npm run build -- --output-path=./dist/out --configuration $configuration
# run with nginx
FROM nginx:1.17
# WORKDIR /usr/share/nginx/html
COPY --from=0 /app/dist/out/ /usr/share/nginx/html
COPY /nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
