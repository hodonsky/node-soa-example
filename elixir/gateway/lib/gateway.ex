defmodule Gateway do
  def waitForMeassage do
    receive do
      {:basic_deliver, payload, _meta} ->
        IO.puts( " [x] Received #{payload}" )
        waitForMeassage()
    end
  end
  def start( _type, _args ) do
    connOptions = [ host: System.get_env("MQ_HOSTNAME"), port: System.get_env("MQ_PORT"), username: System.get_env("MQ_USERNAME"), password: System.get_env("MQ_PASSWORD") ]
    resTopic = "auth-res-1-A"
    { :ok, connection } = AMQP.Connection.open( connOptions )
    { :ok, channel } = AMQP.Channel.open( connection )
    AMQP.Queue.declare( channel, resTopic )
    Task.start( fn ->
      AMQP.Basic.consume( channel,
                   resTopic,
                   nil, # consumer process, defaults to self()
                   no_ack: true)
      Task.start( fn -> 
        :timer.sleep 5000
        AMQP.Basic.publish( channel, "", "auth-res-1-A", "Here is a message")
      end )
      IO.puts( "Waiting For Message" )
      waitForMeassage()
      AMQP.Connection.close(connection)
    end )
  end
end