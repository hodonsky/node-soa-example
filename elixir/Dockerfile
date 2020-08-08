FROM elixir

ARG EXPOSE_PORT
ARG MODULE

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD ./${MODULE} /usr/src/app

RUN mix local.rebar --force
RUN mix local.hex --force
RUN mix deps.get
RUN mix deps.compile

EXPOSE ${EXPOSE_PORT}

CMD [ "mix", "run", "--no-halt" ]