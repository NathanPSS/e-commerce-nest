####  Projeto Final da Disciplina PW1
Rota SWAGGER  
localhost:3000/docs


#### Iniciar Bancos 
docker compose up -d para ligar postgresql na porta 5432 redis na porta 6379 e pgadmin na 15432 no browser  
#### Entrando no PgAdmin
Entre no pgadmin ulitlizando  
Email: admin@gmail.com
Password: postgree

##### Criando uma Conexão com o BD
Crie um novo server clicando com o botão direito na icom server

Name : Postgres
Host name/addres : e-commerce-postgres-compose-1 caso não funcione procure o nome do container com a porta 5432 e o substitua
Username: postgres
Password: 123

##### Criando as Tabelas
Com as dependencias já baixas ultilize npx prisma migrate dev para rodar as migrations no banco

##### Ligar o Servidor 
yarn start:dev 

##### Testes Unitarios

yarn test 

##### Testes E2E
###### NOTA esse tipo de teste ainda está em fase de desenvolvimento  
###### atualmente apenas verificando os status 400 401 e 403 das rotas relativas a api/clientes
###### para o teste ser realmente feito deverar cadastrar um cliente com o seguinte objeto 
{
      email: 'steve@gmail.com',
      password: '123456',
      nome: 'irineu',
      telefone: '9999223121'
}
###### Pois o os Testes irão ler diretamente no BD 

###### Comando
yarn test:e2e
