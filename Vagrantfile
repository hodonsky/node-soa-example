# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_url = "https://cloud-images.ubuntu.com/xenial/current/xenial-server-cloudimg-amd64-vagrant.box"
  config.vm.boot_timeout = 500

  config.ssh.forward_agent = true
  config.ssh.forward_env = [
    "LC_AWS_SENDMAIL_KEY",
    "LC_AWS_SENDMAIL_SECRET"
  ]

  ENV["LC_AWS_SENDMAIL_KEY"]
  ENV["LC_AWS_SENDMAIL_SECRET"]

  config.vm.synced_folder "./", "/home/ubuntu/resources"

  # Port Mapping
  ## HTTP server - Node
  config.vm.network :forwarded_port, guest: 80, host: 8800
  ## HTTP server - Elixir
  config.vm.network :forwarded_port, guest: 8080, host: 8080

  ## DnyamoDB
  #config.vm.network :forwarded_port, guest: 8000, host: 8000
  ## DnyamoDB UI Admin Interface
  config.vm.network :forwarded_port, guest: 8001, host: 8001

  ## RabbitMQ Broker ( UI management port )
  config.vm.network :forwarded_port, guest: 15672, host: 15672

  ## MailDev
  config.vm.network :forwarded_port, guest: 1080, host: 1080

  # Provision w/ Docker
  config.vm.provision :docker

  # Setup & build
  config.vm.provision "shell",privileged: true, inline: "/bin/bash /home/ubuntu/resources/.scripts/bootstrap.sh"

  # VM Settings
  config.vm.provider :virtualbox do |vb|
    vb.linked_clone = true
    vb.name = "Resources Dev Env"
    vb.customize ["modifyvm", :id, "--cpuexecutioncap", "90"]
    vb.customize ["modifyvm", :id, "--name", "Resources Dev Env"]
    vb.customize ["modifyvm", :id, "--memory", "4096"]
    vb.customize ["modifyvm", :id, "--cpus", "2"]
    vb.customize ["modifyvm", :id, "--ioapic", "on"]
  end
end