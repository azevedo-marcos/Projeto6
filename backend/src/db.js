const mysql = require('mysql'); //Usar BancoDeDados

class Conect {
    static conectar() {
        var conxao = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: 'projeto6'
        });
        conxao.connect(function (err) {
            if (err) throw err;
        });
        return conxao;
    }
}
module.exports = Conect;//Exportando a Classe para conexão do banco de dados
