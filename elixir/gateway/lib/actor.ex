defmodule Actor do
  import Plug.Conn

  def init( topic ) do
    connOptions = [
      host: System.get_env("MQ_HOSTNAME"),
      port: System.get_env("MQ_PORT"),
      username: System.get_env("MQ_USERNAME"),
      password: System.get_env("MQ_PASSWORD")
    ]
    { :ok, connection } = AMQP.Connection.open( connOptions )
    { :ok, channel } = AMQP.Channel.open( connection )
    reply_to = topic <> "-res-" <> random_string( 64 )
    AMQP.Queue.declare( channel, reply_to, durable: true )
    %{ channel: channel, reply_to: reply_to }
  end

  def call( conn, opts ) do
    correlation_id = :erlang.unique_integer |>
                     :erlang.integer_to_binary |>
                     Base.encode64
    AMQP.Basic.consume( opts[:channel], opts[:reply_to], nil, no_ack: true )
    AMQP.Basic.publish(
      opts[:channel],
      "",
      conn.assigns[:topic],
      conn.assigns[:data],
      reply_to: opts[:reply_to],
      correlation_id: correlation_id,
      type: conn.assigns[:action]
    )
    reply = receive do
      {:basic_deliver, payload, %{correlation_id: ^correlation_id}} -> payload
    end 
    IO.inspect(reply)
    send_resp( conn, 200, reply )
  end

  def random_string( length ) do
    :crypto.strong_rand_bytes( length ) |> Base.url_encode64 |> binary_part(0, length)
  end
  
  def send_message( conn, topic, action, data ) do
    conn = assign( conn, :topic, topic )
    conn = assign( conn, :action, action )
    assign( conn, :data, data )
  end
end