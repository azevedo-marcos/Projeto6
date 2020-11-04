const User = require('../models/Users');//Importando Models
const yup = require('yup');

class UserControllers {

    //Registrando usuario
    async register(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            name: yup.string().required(),
            cpf: yup.number().required(),
            cep: yup.string().required(),
            password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
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
            cpf: yup.number().required().positive(),
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
    async update(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            cpf: yup.number().required().positive(),
            newpassword: yup.string().required(),
            oldpassword: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        var Database = new User;
        var changed = await Database.update(request)
        //Verifica se houve sucesso na atualização
        if (changed) {
            return response.json({ result: 'Success' });
        }
        return response.json({ result: 'Error' });
    }
}
module.exports = UserControllers;
