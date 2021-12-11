const express = require('express');
const router =express.Router();
const Reporte = require('../models/cliente');


router.get('/', async (req, res) => {
    res.render('reportes')    
    try {
        const arrayDB = await Reporte.find();
        res.render('reportes',{
            arrayDBloc: arrayDB
        })

    }
    catch (err) {
        console.log(err)
    }
    
})

router.get('/reporteClientes', async (req, res) => {
    //res.render('reportes')    
    try {
        const arrayDB = await Reporte.find();
        res.render('reportesClientes',{
            arrayDBloc: arrayDB
        })

    }
    catch (err) {
        console.log(err)
    }
    
})

const VentasCliente = require('../models/cliente');
router.get('/reporteVentas', async (req, res) => {
    //res.render('reportes')    
    try {
        const arrayDB = await VentasCliente.find();
        //.distinct('cedula_cliente');
        res.render('reportesVentas',{
            arrayDBloc: arrayDB
        })
        console.log(arrayDB)
    }
    catch (err) {
        console.log(err)
    }
    
})

// Aqui vamos a ver el detalle de un cliente
const VentaC = require('../models/ventaM');
router.get('/detalleVenta/:id', async (req, res)=>{
    
    const cedula_cliente = req.params.id
    try {
        const ventaDB = await VentaC.find({cedula_cliente:cedula_cliente})
        console.log(ventaDB)
        res.render('detalleVentaCliente',{
            arrayDBloc : ventaDB,
            error : false
        })
    } catch (error) {
        res.render('reportesVentas',{
            error : true,
            mensaje : 'No se encuentra el id escogido'})
    }  
     
})


module.exports = router;