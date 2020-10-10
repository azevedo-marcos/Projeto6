const mysql = require('mysql'); //Usar BancoDeDados

class Conect {
    //Dados do Banco de Dados LOCAL para realização de testes
    static conectar() {
        var conxao = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: 'projeto6'
        });
        //Realização da conexão com Banco de Dados LOCAL
        conxao.connect(function (err) {
            if (err) throw err;
        });
        return conxao;
    }
}
module.exports = Conect;//Exportando a Classe para conexão do banco de dados
