FROM keymetrics/pm2:latest-alpine


RUN apk update && apk upgrade && \
apk add --no-cache bash git openssh

WORKDIR /pid-service

# Set NODE_ENV to "production"
RUN env NODE_ENV=production

# Bundle APP files
COPY .env .
RUN git clone https://github.com/amds-ldeo/pid-service.git

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install --production
RUN npm audit fix

# Expose the listening port of your app
EXPOSE 3000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js --env production"]