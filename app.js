//1 - Invocamos a express
const express = require('express');
const app = express();

//2 - seteamos urleancoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//4 - el directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//5 - Establecemos el motor de plantilla ejs
app.set('view engine', 'ejs');

//6 - Invocamos bcryptjs
const bcryptjs = require('bcryptjs');

//7 - Var de session
const session = require('express-session');
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized:true
}));


//8 - Invocamos el modulo de conexion de la BD
const connection = require('./database/db');

//9 - Estableciendo las rutas
app.get('/', (req, res)=>{
    res.render('index', {msg:'Esto es un mensaje xD'});
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

//10 - Registracion
app.post('/register', async (req, res)=>{
    const user = req.body.user;
    const name = req.body.name;
    const rol = req.body.rol;
    const pass = req.body.pass;
    let passwordHaash = await bcryptjs.hash(pass,8);
    connection.query('INSERT INTO user SET ?',{user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
        if(errror){
            console.log(error);
        }
        else{
            res.render('register',{
                alert:true,
                alertTitle:"Registration",
                alertMessage:"¡Succesful Registration!",
                alertIcon:'success',
                showConfirmButton:false,
                timer:1500,
                ruta:''
            })
        }
    })
})

app.listen(3340, (req, res)=>{
    console.log('EL SERVIDOR SE ESTA EJECUTANDO EN http://localhost:3340');
})