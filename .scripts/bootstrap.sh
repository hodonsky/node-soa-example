#!/bin/bash

echo "cd /home/ubuntu/resources" >> /home/vagrant/.bashrc
echo "alias ls='tree -L 1'" >> /home/vagrant/.bashrc

apt-get update --fix-missing
apt-get install -yf apt-utils build-essential awscli docker-ce

# Get Docker-Compose
sudo curl -L https://github.com/docker/compose/releases/download/1.26.2/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

cd /home/ubuntu/resources

source ~/.profile

docker-compose up -d rabbitmq dynamodb

source ./.scripts/dynamodb/build.sh

docker-compose up -d node-gateway node-service-auth