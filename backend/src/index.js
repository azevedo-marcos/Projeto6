const express = require('express'); //Usar ROTAS
const mysql = require('mysql'); //Usar BancoDeDados
const routes = require('./routes');//Importando as Rotas

const app = express();

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use(express.json());
app.use(routes);

app.listen(3333); //Criando uma Port para o LocalHost

