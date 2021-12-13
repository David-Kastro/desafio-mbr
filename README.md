# Desafio MBR

### Setup inicial

A forma mais fácil de rodar o projeto é usando o comando `docker-compose`! Para isso, é necessário ter instalado na máquina `Docker` ou o `Docker Toolbox`.

Primeiro copie o conteúdo dentro do `.env.example`, crie um arquivo `.env` na raíz do projeto e cole o conteúdo nesse arquivo.

Para subir os containers, use o comando:

```
$ docker-compose up -d
```

Após isso, os serviços estarão disponíveis para acesso local. (`localhost`)

### Os serviços

- RabbitMQ Manager (rabbitmqsvr): `localhost:15672 or localhost:5672`
- MySQL Server (mysqlsrv): `localhost:3306`
- Adminer (adminersrv): `localhost:8080`
- RabbitMQ Server | Nestjs (./rabbitmq:rabbitmq_dev): `localhost:9229`
- REST Server | Nestjs (./api:api_dev): `localhost:3000`
- App | Reactjs (./app:app_dev): `localhost:3001`

Alguns serviços precisam de login e senha para serem acessados..

- Adminer
  - server: `db`
  - username: `admin`
  - password: `admin`
  - database: `desafio`
- RabbitMQ Manager
  - username: `guest`
  - password: `guest`

Páginas acessíveis pelo frontend:

`http://localhost:3000`
`http://localhost:3000/address`
`http://localhost:3000/list`
