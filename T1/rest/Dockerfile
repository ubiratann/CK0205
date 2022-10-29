FROM python:3.10-alpine

LABEL MAINTENER="Ubiratan Júnior"

# Criando pasta de destino e copiando a aplicação
WORKDIR /app
COPY . ./

# Instalando dependências
RUN pip3 install -r requirements.txt

# Ponto de entrada do container
ENTRYPOINT [ "python3", "/app/run.py" ]