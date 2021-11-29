//aqui vamos a crear un servidor con Express
const express = require('express'); // se conecta por medio de la constante y trae todas las librerias de Express
const bodyParser = require('body-parser');
const app = express();
const port = 3444;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())



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
