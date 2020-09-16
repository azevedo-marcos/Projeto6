const mysql = require('mysql'); //Usar BancoDeDados

const UserSchema = new mysql.Schema({
    name: String,
    cpf: String,
    password:String,
    cep:String,
})

module.exports = mysql.model('Users', UserSchema);