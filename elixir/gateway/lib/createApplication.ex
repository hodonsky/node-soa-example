defmodule Router do
  use Plug.Router
  use Plug.Debugger
  require Actor
  require Logger

  plug(Plug.Logger, log: :debug)
  plug(:match)
  plug(:dispatch)

  def __using__( _opts ) do
    #IO.inspect( _opts )
  end

  def mqRouteBuilder ( actions ) do
    Enum.each(
      Enum.filter( actions, fn action -> Enum.any(!Map.has_key?(action, :lambda) end)
      , fn action ->
        plug( Actor, action[:topic] )

        apply(Plug.Router, action[:method], [action[:route], fn conn ->
          # data = action[:lambda](conn)
          #
          # response
        end])
    end)
    match _ do
      send_resp(conn, 404, "Not Found")
    end
  end
end