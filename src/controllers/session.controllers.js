export default class SessionController {
    async register (req, res) {
        res.send({status:"succes", message:"User registered"});
    };
    async failRegister (req, res) {
        console.log('Fallo en el registro');
        res.send({error: 'Error en el registro'})
    };
    async login (req, res) {
        if(!req.user) return res.status(400).send({status:"error", error: 'Invalid credentials'});
        req.session.user = {
            firsName : req.user.firsName,
            lastName: req.user.lastName,
            age: req.user.age,
            email: req.user.email
        };
        res.send({status:"succes", payload:req.res.user, message:"Logueo de usuario exitoso."});
    };
    async failLogin (req, res) {
        console.log('Fallo en el ingreso')
        res.status(400).send({error:'Error en el ingreso.'})
    };
    async logout (req, res) {
        req.session.destroy(err =>{
            if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"});
            res.redirect('/login');
        });
    };
    async github (req, res) {};
    async githubCallbacks (req, res) {
        req.session.user = req.user;
        res.redirect('/');
    };
}