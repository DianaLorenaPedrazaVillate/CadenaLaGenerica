const express = require('express');
const router =express.Router();

const Cliente = require('../models/cliente');


router.get('/', async (req, res) => {
    try {
        const arrayClientesDB = await Cliente.find();
        console.log(arrayClientesDB)
        res.render('clientes',{
            arrayClientes: arrayClientesDB
        })

    }
    catch (err) {
        console.log(err)
    }
})

// vamos a traer el codigo para crear o insertar un registro
router.get('/crear', (req, res) => {
    res.render('crear')
})

// Aqui vamos a transportar los datos de las cajas de la pagina dinamica a la BD
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const clienteDB = new Cliente(body)
        await clienteDB.save()
        //await Cliente.create(body)
        console.log(body)
        res.redirect('clientes')
        
    } catch (error) {
        console.log('error', error)
    }
})

// Aqui vamos a editar una colleccion
router.get('/:id', async (req, res)=>{
    const id = req.params.id
    try {
        const clienteDB = await Cliente.findOne({_id:id})
        console.log(clienteDB)
        res.render('detalle',{
            cliente : clienteDB,
            error : false
        })
    } catch (error) {
        res.render('detalle',{
            error : true,
            mensaje : 'No se encuentra el id escogido'
    }
    )}
})



/*
//Aqui vamos a constuir un archivo de objetos cliente como ejemplo cuando aun no tenemos conectada la BD
router.get('/',(req, res) => {
    res.render('clientes',{
        arrayClientes: [
            {id:'xyz1234', nombre:'Maria Jose', apellidos: 'Lopez sanchez', celular: 3113113112},
            {id:'xyz1235', nombre:'Juan Carlos', apellidos: 'Mendez Rodriguez', celular: 3117875698},
            {id:'xyz1236', nombre:'Ana Maria', apellidos: 'Peña Gonzalez', celular: 3214567894},
            {id:'xyz1237', nombre:'Juan Diego', apellidos: 'Gomez Llanos', celular: 3154892615}
        ],
    })

});
*/
module.exports = router;