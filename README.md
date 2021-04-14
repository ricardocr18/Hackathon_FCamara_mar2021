# Hackathon_FCamara_mar2021
Projeto social que envolve aluno/papelaria/doador realizado no Hackathon da FCamara em Março de 2021, em conjunto com a equipe de DEVs: Carolina Andrade, Enzo Carvalho, Ivan Szoboszlay.

# Projeto Lapiseira - Squad 28
## Como instalar
Clone o projeto:
```bash
git clone https://github.com/enzocsantos18/squad28.git
```
- Baixe o [Node](https://nodejs.org/en/download/)
- Baixe o [Sql Server](https://go.microsoft.com/fwlink/?linkid=866662)
- Baixe o [Sql Server Management Studio](https://aka.ms/ssmsfullsetup)

## Configuração de ambiente
Siga os passos desse documento : https://www.notion.so/Configura-o-de-ambiente-3a046d9949484aeca4271c81b2088aa0

## Para rodar o backend
Navegue para a pasta /backend 
- Baixe as dependências do projeto utilizando o comando
``` npm install```
- Preencha o arquivo ormconfig.json, com as credênciais configuradas no sql
```
{
  "type": "mssql",
  "host": "localhost", //Host do servidor mssql
  "port": 1433,
  "username": "root", // Usuário do banco de dados
  "password": "root", // Senha do banco de dados
  "database": "MateriaisDB",
  "logging": false,
  "entities": [
     "src/app/models/*.ts"
  ],
  "migrations": [
     "src/database/migrations/*.ts"
  ],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
}
```
- Crie um arquivo .env na raiz da pasta backend seguindo o padrão .env.example
 ``` 
    JWT_SECRET=[INSIRA UMA PALAVRA QUALQUER]   #Chave de segredo JWT
 ```
- Rode as migrations utilizando o comando:
`` 
npm run typeorm migration:run
``
Obs: caso algum erro aconteça nesse processo, certifique-se que o ormconfig.json está preenchido corretamente e que o ambiente esteja devidamente configurado.
- Rode o projeto utilizando o comando:
`` 
npm run dev
``

### Documentação da api
https://documenter.getpostman.com/view/9120629/TzCP8o68

## Para rodar o frontend
Navegue para pasta frontend e 
Instale as dependências:

```bash
npm install
```

Inicie o servidor:
```bash
npm run start
```

A aplicação abrirá automaticamente no seu navegador.

## Tecnologias utilizadas
### Backend
 - TypeORM
 - Express
### Frontend
 - ReactJS

## Login das papelarias cadastradas
dipfrapel@gmail.com
ministop@gmail.com
novacarrao@gmail.com
premium@gmail.com
clig@gmail.com
pimentel@gmail.com
imperio@gmail.com
momotaro@gmail.com
alphagraphics@gmail.com
papelariaaviamentos@gmail.com

Todas utilizam a senha: 12345678

