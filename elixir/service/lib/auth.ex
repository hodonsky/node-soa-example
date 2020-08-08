defmodule Auth do
  require Actor

  def init( arg ) do
    Actor.init( arg )
  end

  def gettoken( payload ) do
    "gottoken with: #{payload}"
  end
end