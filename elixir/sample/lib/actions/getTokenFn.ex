defmodule getTokenFn do
  def call( conn, opts ) do
    IO.inspect( conn )
    IO.inspect( opts )
    "token-token-token"
  end
end