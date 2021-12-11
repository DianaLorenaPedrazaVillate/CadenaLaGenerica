// aca vamos a crear nuestro modelo
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// aqui va el esquema de datos en la base de datos
const loginSchema = new Schema({
    

})

//Creacion modelo de la base de datos
const Login = mongoose.model('Login',loginSchema);

module.exports = Login;