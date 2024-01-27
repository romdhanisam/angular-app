FROM node:16.20

ENV NPM_CONFIG_LOGLEVEL warn
ARG app_env
ENV APP_ENV $app_env

LABEL maintainer="Samir Romdhani samir.romdhani1994@gmail.com"

RUN mkdir -p /frontend
WORKDIR /frontend
COPY ./ ./

RUN npm install

CMD if [ ${APP_ENV} = production ]; then npm install -g http-server && \
	npm run build && \
	cd build && \
	http-server -p 3000; \
	else \
	npm run start; \
	fi

EXPOSE 3000
