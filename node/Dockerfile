FROM node

ARG EXPOSE_PORT

RUN mkdir /usr/src/app
RUN mkdir /usr/src/dist
RUN mkdir /usr/src/deps
WORKDIR /usr/src/deps

ADD ./package.json      /usr/src/deps/package.json
ADD ./package-lock.json /usr/src/deps/package-lock.json
ADD ./babel.json        /usr/src/deps/babel.json
RUN npm i

ENV NODE_PATH=/usr/src/deps/node_modules
ENV NODE_ENV=local


EXPOSE ${EXPOSE_PORT}

CMD npm run restart