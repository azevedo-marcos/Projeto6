const User = require('../models/Users');//Importando Models
const dotenv = require('dotenv').config();//Importando Variaveis de Ambiente
const Email = require('../uteis/Email')//Importando função Enviar Email
const yup = require('yup');



class UserControllers {

    //Registrando usuario
    async register(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            name: yup.string().required(),
            cpf: yup.string().required(),
            email: yup.string().required(),
            address: yup.string().required(),
            password: yup.string().required(),
            phone: yup.string().required(),
        });
        console.log(request.body);
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Failled' });
        }
        var Database = new User;
        //Verificando se o usuario já existe
        var exists = await Database.db_login(request);
        if (exists) {
            return response.json({ result: "User already exists" });
        }
        //Registrar usuário 
        Database.db_insert(request);
        return response.json({ result: "Registered User" });
    }

    //Entrando com usuario
    async login(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().required(),
            password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        var Database = new User;
        //Buscando Usuario
        var user = await Database.db_login(request);
        return response.json(user);
    }

    //Listagem de usuario
    async list(request, response) {
        var Database = new User;
        //Buscando Usuarios
        var list = await Database.list(request);
        return response.json(list);

    }
    //Atualizar senha de usuarios
    async update_pass(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().required(),
            new_password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        //Atualizando o banco de dados
        var result = ChangePass(request);
        return response.json(result);

    }

    async recover_pass(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            email: yup.string().email().required(),
            title: yup.string().required(),
        });
        //Gerando uma senha nova para o usuario
        request.body.new_password = Math.random().toString(36).substring(7);
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        //Atualizando o banco de dados
        var result = await ChangePass(request);
        //Enviar email
        var recover = new Email();
        recover.sendEmail(request);

        return response.json(result);
    }
}
//Atualizar BD
ChangePass = async (request) => {
    var Database = new User;
    var changed = await Database.update_pass(request)
    //Verifica se houve sucesso na atualização
    if (changed) {
        return ({ result: 'Success' });
    }
    return ({ result: 'Error' });
}
module.exports = UserControllers;
