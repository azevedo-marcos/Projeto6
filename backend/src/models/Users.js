const conex = require('../database/index');//Exportando a classe de banco de dados para conexão
const util = require('util');//Exportando a função para transformar outras funções em Assincrona 

class User {
    //Registrar um usuario no BANCO DE DADOS
    db_insert(request) {
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar();
        //Pegando os dados da Corpo da Requisição
        const { name, cpf, password, address, email, phone} = request.body;
        var data = [name, cpf, password, address, email, phone];
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "INSERT INTO user (name,cpf,password,address,email, phone) VALUES (?,?,?,?,?,?)";
        //Realização da inserção no Banco de Dados
        conn.query(sql, data, function (err) { //(err, result)  
            if (err) throw err;
        });
    }
    //Entrar com um usuario
    async db_login(request) {
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar();
        //Transforma uma função "conn.query" em ASSINCRONA
        const query = util.promisify(conn.query).bind(conn);
        //Pegando os dados da Corpo da Requisição
        const { email, password } = request.body;
        var data = [email, password];
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "SELECT * FROM user WHERE email = ? AND password = ?";
        //Realização da busca SQL
        var result = await query(sql, data);
        return result[0];
    }
    //Listando os usuarios
    async list() {
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar();
        //Transforma uma função "conn.query" em ASSINCRONA
        const query = util.promisify(conn.query).bind(conn);
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "SELECT * FROM user";
        //Realização da busca SQL
        var result = await query(sql);
        return result;
    }
    //Atualização de senha do usuario
    async update_pass(request) {
        //Pegando os dados da Corpo da Requisição
        const { email, new_password} = request.body;
        var data = [new_password, email];
        //Realizando Conexão com Banco de Dados
        var conn = conex.conectar();
        //Transforma uma função "conn.query" em ASSINCRONA
        const query = util.promisify(conn.query).bind(conn);
        //Comando SQL de Busca para verificar os dados da entrada
        var sql = "UPDATE user SET password = ? WHERE email = ?";
        //Realização da busca SQL
        var resultt = await query(sql, data);
        return resultt.changedRows;
    }

}
module.exports = User;//Exportando a Classe de Usuario
