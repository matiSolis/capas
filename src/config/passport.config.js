import passport from 'passport';
import local from 'passport-local';
import GitHubStrategy from 'passport-github2';
import { createHash, validatePassword } from '../utils.js';
import userModel from '../Dao/models/user.model.js';

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use('register', new LocalStrategy(
        {passReqToCallback:true, usernameField:'email'}, 
        async (req,username, password,done) =>{
            const { firstName, lastName, email, age } = req.body;
            try {
                const user = await userModel.findOne({ email:username }); 
                if(user){
                    console.log('El usuario existe');
                    return done(null, false, { message: 'El usuario ya existe' });
                }
                const newUser = {
                    firstName, 
                    lastName, 
                    email, 
                    age, 
                    password: createHash(password),
                    role
                }
                const result = await userModel.create(newUser);
                return done(null, result, { message: 'Usuario registrado exitosamente' });
            } catch (error) {
                return done("Error al registrar el usuario: " + error);
            }
        }
    ));
    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });
    passport.deserializeUser( async (id, done)=>{
        const user = await userModel.findById(id);
        done(null, user)
    });
    passport.use('login', new LocalStrategy({usernameField:'email'}, async (username, password, done)=>{
        try {
            if (username === 'admin@admin.com' && password === 'admin') {
                const adminUser = {
                    first_name: 'Admin',
                    last_name: 'Admin',
                    email: username,
                    age: 0,
                    role: 'admin'
                };
                console.log('Ingreso exitoso como administrador');
                return done(null, adminUser, { message: 'Ingreso exitoso como administrador' });
            }
            const user = await userModel.findOne({email:username})
            if(!user){
                console.log('No existe el usuario');
                return done(null, false);
            };
            if(!validatePassword(password,user)) {
                return done (null, false, { message: 'Contraseña incorrecta' });
            }
            return done(null,user, { message: 'Ingreso exitoso' });
        } catch (error) {
            return done("Error al intentar ingresar: " + error);
        }
    }));
    passport.use('github', new GitHubStrategy({
        clientID:'Iv1.8d404415d7c956ee',
        clientSecret:'aaddafdf749d73f2bf53fb45473024714da1f093',
        callbackURL:'http://localhost:8080/api/session/githubcallback'
    }, async(accessToken, refreshToken, profile, done)=>{
        try{
            console.log(profile);
            const user = await userModel.findOne({email: profile._json.email});
            if(!user){
                const email = profile._json.email || `${profile.username}@github.com`;
                const newUser = {
                    firstName: profile._json.name,
                    lastName: '',
                    email: email,
                    age:18,
                    password: '',
                    role: 'User'
                };
                const result = await userModel.create(newUser);
                done(null, result);
            }else{
                done(null, user);
            }
        }catch(error){
            return done(null, error);
        };
    }))
}

export default initializePassport;