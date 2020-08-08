defmodule Service.MixProject do
  use Mix.Project

  def project do
    [
      app: :service,
      version: "0.1.0",
      elixir: "~> 1.10",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {Service, []},
      applications: [:amqp],
      extra_applications: [:lager, :logger]
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [ {:amqp, "~> 1.5.0"} ]
  end
end
