defmodule Gateway do
  require Supervisor
  use Router
  #use Application

  #def start( _type, args ) do
  def init( args )
    children = [
      Plug.Cowboy.child_spec(
        scheme: :http,
        plug: args.router,
        options: [ port: String.to_integer( System.get_env( "PORT" ) ) ]
      )
    ]
    Supervisor.start_link( children, [strategy: :one_for_one] )
  end
end