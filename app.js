//aqui vamos a crear un servidor con Express
const express = require('express'); // se conecta por medio de la constante y trae todas las librerias de Express
const bodyParser = require('body-parser');
const app = express();
const port = 3444;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* -------------------------------- Login --------------------------------*/
//Librerias necesarias para login
const passport = require('passport') //Configurar PASSPORT como la librería de autenticación de usuario
const cookieParser =require('cookie-parser'); //libreria 1 para que express pueda manejar sesiones
const session = require('express-session'); //libreria 2 para que express pueda manejar sesiones
const PassportLocal = require('passport-local').Strategy; //Libreria de estrategi de Passport para login tradicional Local
//Todas deben ser instaladas en el proyecto vía: npm install


//Para poder leer/interpretar la información que se envía por un formulario hace falta un Midleware que viene con Express
app.use(express.urlencoded({extended: true}));

//Configuración de CookiePArser
app.use(cookieParser('mi secreto'));

//Configuración de Session
app.use(session({ 
    secret: 'mi secreto',
    resave: true, //en cada petición aunque la sesión no haya sido modificada la vamos a volver a guardar
    saveUninitialized: true //si inicializacmos una sesión y no guardamos nada, aun así se va a guardar
}));

//Configuración de PASSPORT
app.use(passport.initialize()); 
app.use(passport.session()); // PASSPORT tiene muchas estrategias de autenticación, por ejemplo con RRSS, o la más clásica que es con usuaario y contraseña llamada LOCAL

passport.use(new PassportLocal(function (usuario, password, done) { //estos argumentos deben ser los mismos de "name" del formualrio POST del Login 
    //done(err, {name: "NombreUsuario"}, {password})
    if (usuario === "11" && password === "22")
        return done(null, {id: 1, name: "Carlos"}); //Esta es la simulación de un usuario. En entorno real sería una BBDD

    done(null, false); //Sumularia que aunque no hubo error "false" indica que tampoco hay un usuario
}));

// Serialización y Deserialización, es forma deidentificar el usuario registrado sin haber guardado o almacenado sus datos 
//{id: 1, name: "NombreDelUsuario"}    lo guarda solo como un 1 => Serialización
passport.serializeUser(function (user, done){
    done(null,user.id);
});

//Deserialización
passport.deserializeUser(function(id, done){
    done(null,{id: 1, name: "Carlos"})
})


app.get('/', (req, res, next) => {
    if(req.isAuthenticated()) return next();
    //Si isAuthenticated es true quiere decir que la sesión fue iniciada
    //El next true indicará que se debe pasar al siguiente midleware para mostrar la vista de Bienvenida

    res.redirect("/login");

}, (req, res) => {
    //Si ya iniciamos sesión se mostrará la vista de Bienvenida
    //Si no se ha iniciado la sesión entonces se redirecciona a /login
    
    res.redirect("/productos");    
})

app.get("/login", (req, res) => {
    //Mostrar el formulario de login
    res.render("index");
});


app.post("/login", passport.authenticate('local',{
    successRedirect:"/productos",
    failureRedirect:"/login"

}));

/* -------------------------------- conexion a la BD con MongoDB--------------------------------*/
// vamos a conectar a la BD Mongo
const mongoose = require('mongoose'); // lamar la libreria mongoose a traves de una constante objeto que tambien se llama mongoose en este caso

const usuario = '';
const password = '';
const dbName = "tienda";

//const uri = `mongodb://localhost:27017//${usuario}:${password}@cluster0.ncdk5.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const uri = `mongodb://localhost:27017/${dbName}`

// para ejecutar la conexion con la BD y si saca errores los notifica con el siguiente comando
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=> console.log('conectado a la BD')).catch(e => console.log('error de conexión', e))

// motor de plantillas
app.set('view engine', 'ejs');
app.set('views',__dirname + '/views');


// aqui vamos a configurar una carpeta publica de archivos para traer todas las librerias de CSS y js que pueda necesitar nuestro proyeto
app.use(express.static(__dirname + '/public'));


// ************aqui crearemos un sevidor con Express********************
/*app.get("/",(req, res)=>{

    res.send("<h1>Hola Bienvenidos desde Servidor express V1 </h1>");
});*/
/*app.get("/productos", (req, res)=>{
    res.send("<h1 align=center> Hola estas en la pagina de productos </h1>");
} );*/


//*************** Aqui creamos la ruta al archivo RutasWeb donde se llamaran todos los demas archivos js que se conectaran con la BD Mongo
app.use('/', require('./router/RutasWeb'));// Rutas WEB

// Ejemplo para ruta de archivo de datos Clientes. No se va a utilizar aca sino que sera llamada desde el archivo RutasWeb por ordenar el servidor
//app.use('/clientes',require('./router/clientes'));


// aqui hago un middleware para llamar un archivo en particular
app.use((req, res, next) => {
    res.status(404).render("404",{titulo: "error 404", descripcion: "esta página tiene error"});
});


// aca escucharemos al servidor con Express
app.listen(port, ()=>{
    console.log(`este es un ejemplo con el servidor ${port}`)
});
