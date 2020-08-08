defmodule Actor do
  require Logger

  def init( queue ) do
    connOptions = [
      host: System.get_env("MQ_HOSTNAME"),
      port: System.get_env("MQ_PORT"),
      username: System.get_env("MQ_USERNAME"),
      password: System.get_env("MQ_PASSWORD")
    ]
    { :ok, connection } = AMQP.Connection.open( connOptions )
    { :ok, channel } = AMQP.Channel.open( connection )

    AMQP.Queue.declare( channel, queue, durable: true )
    AMQP.Basic.qos( channel, prefetch_count: 1 )
    AMQP.Basic.consume( channel, queue, nil, no_ack: true )
    wait_for_message( channel, queue )
  end

  def wait_for_message( channel, queue ) do
    Logger.info "Listening to channel"
    receive do
      {:basic_deliver, payload, meta } ->
        Logger.info "Message Received #{IO.inspect( payload )}"
        response = apply(
                    String.to_existing_atom("Elixir.#{:string.titlecase(queue)}"),
                    String.to_existing_atom("#{meta.type}"),
                    [ payload ]
                  )
        AMQP.Basic.publish(channel,
                           "",
                           meta.reply_to,
                           response,
                           correlation_id: meta.correlation_id)
        AMQP.Basic.ack( channel, meta.delivery_tag )
        
        Actor.wait_for_message( channel, queue )
    end
  end
end