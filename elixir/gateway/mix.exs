defmodule Gateway.MixProject do
  use Mix.Project
  def project do
    [
      app: :gateway,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end
  def application do
    [
      mod: {Gateway, []},
      applications: [:amqp],
      extra_applications: [ :lager, :logger, :cowboy, :plug, :poison ]
    ]
  end
  defp deps do
    [
      {:amqp, "~> 1.5.0"},
      {:cowboy, "~> 2.8.0"},
      {:plug_cowboy, "~> 2.3.0"},
      {:plug, "~> 1.10.2"},
      {:poison, "~> 3.1"}
    ]
  end
end
