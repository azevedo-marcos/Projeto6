const User = require('../models/Users');//Importando Models
const yup = require('yup');

class UserControllers {
    //Registrando usuario
    async register(request, response) {
        //Verificando se todos os dados necessarios foram passados
        let schema = yup.object().shape({
            name: yup.string().required(),
            cpf: yup.number().required().positive(),
            cep: yup.string().required().positive(),
            password: yup.string().required(),
        });
        if (!(await schema.isValid(request.body))) {
            return response.json({ error: 'Validation Fails' });
        }
        var register = new User;
        //Verificando se o usuario já existe
        var exists = await register.db_login(request);
        if (exists) {
            return response.json({ result: "User already exists" });
        }
        //Registrar usuário 
        register.db_insert(request);
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
        var register = new User;
        //Buscando Usuario
        var user = await register.db_login(request);
        return response.json(user);
    }
}
module.exports = UserControllers;
