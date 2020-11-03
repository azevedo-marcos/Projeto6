const mysql = require('mysql'); //Usar BancoDeDados
const dotenv = require('dotenv').config();//Importando Variaveis de Ambiente

class Conect {
    //Dados do Banco de Dados LOCAL para realização de testes
    static conectar() {
        var conxao = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS ,
            database: process.env.DB_DATABASE
        });
        //Realização da conexão com Banco de Dados LOCAL
        conxao.connect(function (err) {
            if (err) throw err;
        });
        return conxao;
    }
}
module.exports = Conect;//Exportando a Classe para conexão do banco de dados
