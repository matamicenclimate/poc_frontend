# pull official base image
FROM node:16-alpine

# add nginx with settings
RUN apk add --no-cache nginx
RUN apk add git
ADD ./compose/production/nginx.conf /etc/nginx/nginx.conf

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY yarn.lock ./
RUN yarn install

# copy scripts
COPY ./compose/production/entrypoint ./entrypoint
RUN sed -i 's/\r//' ./entrypoint
RUN chmod +x ./entrypoint

COPY ./compose/production/start ./start
RUN sed -i 's/\r//' ./start
RUN chmod +x ./start

# copy code
COPY . .
RUN rm -rf .env*

# start app
ENTRYPOINT ["./entrypoint"]
