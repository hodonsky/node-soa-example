defmodule Sample.MixProject do
  use Mix.Project
  def project do
    [
      app: :sample,
      version: "0.1.0",
      elixir: "~> 1.12.2",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end
  def application do
    [
      mod: { Gateway, [] },
      applications: [],
      extra_applications: [ :lager, :logger, :plug, :poison ]
    ]
  end
  def deps do
    [
      {:plug, "~> 1.16.1"},
      {:poison, "~> 6.0"}
    ]
  end
end
