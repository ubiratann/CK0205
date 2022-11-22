#!/bin/bash

echo 

figlet "SVP Builder"

docker-compose build $@

echo -e "\nDeploying required services for $@s"
docker-compose up -d $@