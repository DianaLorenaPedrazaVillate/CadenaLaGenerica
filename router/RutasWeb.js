const express = require('express');
const router =express.Router();

// Aqui traigo las rutas para ordenar un archivo. Se debe anunciar desde app.js

// Esta seccion es cuando se trabaja con paginas dinamicas y se utiliza la variable Titulo para hacer el cambio dinamico

router.get("/", (req, res) => {
    res.render('index', {titulo: "Ingreso usuario"});    
})
/*
router.get("/productos", (req, res) => {
    res.render("productos", {titulo: "Lista de Productos"});
});

router.get("/ventas", (req, res) => {
    res.render("ventas", {titulo: "Ventas de la TG"});
});

router.get("/reportes", (req, res) => {
    res.render("reportes", {titulo: "Reportes para la TG"});
});

router.get("/consolidacion", (req, res) => {
    res.render("consolidacion", {titulo: "Consolidación de sedes"});
});
*/
/*router.get("/usuarios", (req, res) => {
    res.render("usuarios", {titulo: "página dinámica de usuarios"});
});*/

// Para ordenar las rutas se centralizan en esta carpeta y no se llaman desde app.json
router.use('/clientes',require('./clientes'));
router.use('/productos',require('./productosR'));
router.use('/ventas',require('./ventasR'));
router.use('/reportes',require('./reportesR'));

module.exports = router;