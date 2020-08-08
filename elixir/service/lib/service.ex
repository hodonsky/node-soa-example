defmodule Service do
  require Supervisor
  require Auth

  def start( _type, _args ) do
    children = [ Auth.init(System.get_env("MQ_QUEUE")) ]
    Supervisor.start_link( children, [strategy: :one_for_one] )
  end 
end
