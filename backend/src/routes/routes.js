const UserController = require('../controllers/UsersControllers'); //Exportando o Controller de Usuario 
const express = require('express');//Exportando o Express para criação das rotas
const passport = require('passport');//Exportando o Passport para utilização do OAuth
const cookieSession = require('cookie-session');//Exportando o Cookie Session para guardar os dados da sessão
require('../../passport-setup'); //Importando o arquivo com as configurações do passaport
const routes = express()


//Guardando os dados da Sessão;
routes.use(cookieSession({
    name: 'session',    
    keys: ['key1', 'key2']
}))

//Instanciando o objeto da classe de Controller de Usuario 
var users = new UserController(); 
//Inicializando o processo de autentificação 
routes.use(passport.initialize());
routes.use(passport.session());

//Verificar se o usuario está logado
const isLoggedIn = (req,res,next)=>{
    //Se existier "USER", ele estão logado
    if(req.user){
        next();
    }
    //Se não existir, retornarar erro 401
    else {
        res.sendStatus(401);
    }
}
//Rota para não log pelo google
routes.get('/', (req,res) => res.send("Nao Logado"));

//Rota para login bem sucedido
routes.get('/good', isLoggedIn ,(req,res) =>res.json(JSON.stringify(req.user._json)));
//routes.get('/good', isLoggedIn ,(req,res) =>res.send(`Logado ${req.user.displayName}!`) ); 

//Rota para efetuar o login
routes.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//Rota de Retorno
routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        //Sucesso de autentificação, redirecionar para a home. Por enquanto esta sendo usado /good
        res.redirect('/good');
    });
//Rota para deslogar o usuario  
routes.get('/logout',(req,res)=>{
    req.session=null;
    req=null;
    req.logOut();
    res.redirect('/');
})
//Rota para visualizar usuario
routes.get('/show',isLoggedIn,(req,res)=>{
    res.json(req.user._json);

})

//Rota de verificar USUARIO
routes.post('/login', users.login);
//Rota de registrar USUARIO
routes.post('/register', users.register);
//Exportando as rotas
module.exports = routes; 

