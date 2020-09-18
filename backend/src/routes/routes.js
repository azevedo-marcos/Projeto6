const { Router } = require('express'); //Exportando o Express para criação das rotas
const UserController =  require('../controllers/UsersControllers'); //Exportando o Controller de Usuario 
const routes = Router();

var users=new UserController();//Instanciando o objeto da classe de Controller de Usuario   

routes.post('/register',users.register);//Rota de registros de USUARIO
routes.post('/login',users.login);//Rota de listagem de USUARIO

module.exports = routes; //Exportando as rotas

