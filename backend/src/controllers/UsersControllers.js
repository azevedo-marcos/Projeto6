const { response } = require('express');
const User = require('../models/Users');//Importando Models

class UserControllers {
    //Registrando usuario
    register(request, response) {
        var register = new User;
        register.db_insertd(request);
        return response.json(register);
    }
    //Entrando com usuario
    async login(request, response) {
        var register = new User;
        var i = await register.db_login(request);
        return response.json(i[0]);
    }
}
module.exports = UserControllers;
