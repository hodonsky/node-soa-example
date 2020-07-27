FROM elixir

ARG EXPOSE_PORT

RUN mkdir /usr/src/app
WORKDIR /usr/src/app

ADD ./gateway /usr/src/app

RUN mix local.hex --force
RUN mix local.rebar --force
RUN mix deps.get
RUN mix deps.compile

RUN mix compile

EXPOSE ${EXPOSE_PORT}

CMD [ "mix", "run", "--no-halt" ]