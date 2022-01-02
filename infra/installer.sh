#!/bin/bash

set -ex
sudo amazon-linux-extras install -y docker
sudo service docker start

sudo docker login -u AWS -p $(aws ecr get-login-password --region ap-southeast-2) $(ECR).ap-southeast-2.amazonaws.com

sudo docker pull $(ECR).ap-southeast-2.amazonaws.com/stocktracker

sudo docker run -p 80:80 -d $(ECR).ap-southeast-2.amazonaws.com/stocktracker:latest