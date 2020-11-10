FROM node:14.5.0-stretch-slim as build

RUN apt-get update -y && \
    apt-get install -y \ 
      build-essential

COPY ./package.json ./package-lock.json /build/

WORKDIR /build

RUN npm ci

COPY ./ /build

# The `app` stage is a slimmed down more secure image for running in production
FROM node:14.5.0-stretch-slim as app

ARG VERSION=latest

ENV VERSION=${VERSION}

COPY --from=build /build /srv

WORKDIR /srv

EXPOSE 3000

CMD ["npm","start"]