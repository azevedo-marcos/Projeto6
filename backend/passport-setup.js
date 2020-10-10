const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//Seriealize e Deserialize são usados em Authenticator
//Serialize serve para verificar quais dados serão armazenados no cookie
passport.serializeUser(function (user, done) {
    done(null, user);
});
//Deserialize serve para encontrar todos os dados através do dado armazenado pelo cookie
passport.deserializeUser(function (user, done) {  
        done(null, user);
});
//Dados do Google Credenciais criado para testes
passport.use(new GoogleStrategy({
    clientID: "918529346541-jukfl0rvi3g2itfcdfvhg2hptjfmii7u.apps.googleusercontent.com",
    clientSecret: "untx86MgKxuSVThYP4AW8x1f",
    callbackURL: "http://localhost:8001/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
            return done(null, profile);
    }
    
));
