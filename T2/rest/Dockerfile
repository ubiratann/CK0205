FROM python:3.10-alpine

# Criando pasta de destino e copiando a aplicação
WORKDIR /app
COPY . ./

# Instalando dependências
RUN pip3 install -r requirements.txt

EXPOSE 5000

# Ponto de entrada do container
ENTRYPOINT [ "python3", "/app/run.py" ]