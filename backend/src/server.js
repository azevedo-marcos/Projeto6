const express = require('express'); //Usar ROTAS
const mysql = require('mysql'); //Usar BancoDeDados
const routes = require('./routes/routes');//Importando as Rotas
const app = express();

//Dados para conexão do banco de dados MySQL
app.use(express.json());
app.use(routes);
//Criando uma Port para o LocalHost
app.listen(3333); 
