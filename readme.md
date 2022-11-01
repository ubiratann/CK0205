# CK0205 - Desenvolvimento de Software para Nuvem

## T1
Link para video demonstrativo do Trabalho 01 aqui: [Video demosntrativo](https://#)

## T2

> Para que ambos os deploys funcionem é necessário que sua conta AWS tenha as tabelas svp e svp-menu criadas no Dynamodb, e que os itens que estão localizados em CK0205/T2/aws/menu sejam criados na tabela svp-menu.

### Setup para deploy local

#### Frontend 

Para realizar o deploy do front-end é necessário configurar o endereço do rest no valor da variavel `apiUrl` que fica em `CK0205/T2/ui/src/environment/environment.prod.ts`, essa variável pode ser setada com o valor `http://<endereço_do_rest>:5000/api/v1`, como forma de simular um serviço simples de DNS, você pode utilizar `http://svp-rest:5000/api/v1`, e adicionar uma entrada no arquivo hosts do sistema operacional redirecionando as requisições destinadas a `svp-rest` e `svp-ui` para `127.0.0.1`, para fazer isso você deve adicionar a seguinte linha ao fim do arquivo:

```
127.0.0.1 svp-rest svp-ui svp-database svp-storage
```

Localizando arquivo hosts:

- No Linux o arquivo está em /etc/hosts 
- No Windows o arquivo está em C:\Windows\System32\drivers\etc\hosts

Em ambos os sistemas é necessária privilégios de administrador para editar o arquivo.

#### Volumes

Para realizar o deploy é necessário que algumas pastas dentro da pasta `CK0245/T2/` sejam criadas, elas serão mapeados como volumes utilizados pelo storage e rest de projeto.

- `minio/data`: Volume onde os objetos serão armazenados
-  `aws`: Volume onde o arquivo com credenciais da aws (`config`), ficará localizado 

#### Deploy

Após o processo de configuração, é necessário apenas executar o comando `docker compose build && docker compose up` dentro da pasta `CK0205/T2`, e o sistema estará disponível em `http://svp-ui:8080`

### Setup para AWS

Para realizar o deploy em uma instancia EC2 é necessário que as seguintes configurações já tenham sido feitas:

1. Instância com acesso a internet
2. Grupo de segurança da instância com regras de entrada e saída para as seguintes portas:
- 9000
- 9090
- 8080
- 5000
3. Instalação do runtime docker
4. Instalação do git

Feitas essas configurações, e clonado o repositório, basta que seja feita a configuração do build do frontend de forma que o endereço configurado no arquivo `CK0205/T2/ui/src/environment/environment.prod.ts` seja o seguinte `http:<ip_ou_dns_publico_da_instancia>:5000/api/v1`.

Após isso realize os mesmos passos de confguração dos [volumes](#volumes) e [deploy](#deploy) e o sistema estará disponível em `http://<ip_ou_dns_publico_da_instancia>:8080`