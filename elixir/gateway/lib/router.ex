defmodule Router do
  use Plug.Router
  use Plug.Debugger
  require Actor
  require Logger

  plug(Plug.Logger, log: :debug)
  plug(:match)
  plug(:dispatch)

  @topic "auth"

  plug( Actor, @topic )

  def __using__( opts ) do
    #IO.inspect( opts )
  end

  post "/gettoken" do
    { :ok, body, conn } = read_body( conn )
    body = Poison.decode!( body )
    body = "#{get_in(body,["username"])}:#{get_in(body,["password"])}"
    Actor.send_message( conn, @topic, "gettoken", body )
  end

  match _ do
    send_resp(conn, 404, "Not Found")
  end

end