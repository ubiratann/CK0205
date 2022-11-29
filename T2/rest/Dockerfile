FROM python:3.10-alpine

# Criando pasta de destino copiando a requisitos
WORKDIR /app
COPY requirements.txt ./

# Instalando dependências
RUN pip3 install -r requirements.txt

# Copiando aplicacao
COPY . ./
EXPOSE 5000

# Ponto de entrada do container
ENTRYPOINT [ "python3", "/app/run.py" ]