const { Router } = require('express');
const UserController =  require('../models/Dev');

const routes = Router()

routes.post('/users', (request, response)=>{
    console.log(request.body);
    return response.json({ message : 'Main Page' });
});

module.exports = routes; //Exportando as rotas