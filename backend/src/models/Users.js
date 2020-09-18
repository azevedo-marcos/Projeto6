const yup = require('yup'); //Usar obrigatoriedade de informações
const conex = require('../db');//Exportando a classe de banco de dados para conexão
const util = require('util');//Exportando a função para transformar outras funções em Assincrona 

class User {
    /*constructor() {
        var name;
        var cpf;
        var password;
        var cep;
    }*/
    //Registrar um usuario no BANCO DE DADOS
    db_insertd(request) {
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar();
        //Pegando os dados da Corpo da Requisição
        const { name, cpf, password, cep } = request.body;
        var data = [[name, cpf, password, cep]];
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "INSERT INTO user (name,cpf,password,cep) VALUES (?)";
        //Realização da inserção no Banco de Dados
        conn.query(sql, data, function (err) { //(err, result)  
            if (err) throw err;
        });
    }
    //Entrar com um usuario
    async db_list(request) {
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar(); 
        //Transforma uma função "conn.query" em ASSINCRONA
        const query = util.promisify(conn.query).bind(conn);
        //Pegando os dados da Corpo da Requisição
        const { cpf, password } = request.body;
        var data = [cpf, password];
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "SELECT * FROM user WHERE cpf = ? AND password = ?";
        //Realização da busca SQL
        const resultado = await query(sql, data);
        return resultado;
    }
}
module.exports = User;//Exportando a Classe de Usuario
