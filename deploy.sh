#!/bin/bash

# verifica se os arquivos foram enviados
if [[ ! -d "dist" ]]; then
  echo "Deploy folder not found"
  exit
fi

sudo rm -r /opt/bitnami/apps/casamento-augusto-e-helena.com.br
sudo mkdir /opt/bitnami/apps/casamento-augusto-e-helena.com.br
sudo mv -f dist/* /opt/bitnami/apps/casamento-augusto-e-helena.com.br
