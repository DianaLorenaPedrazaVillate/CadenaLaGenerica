const express = require('express');
const router =express.Router();

const Login = require('../models/loginM');


router.get('/', async (req, res) => {
    try {
        const arrayDB = await Login.find();
        res.render('index',{
            arrayDBloc: arrayDB
        })

    }
    catch (err) {
        console.log(err)
    }
})

// Aqui vamos a transportar los datos de las cajas de la pagina dinamica a la BD
router.post('/', async (req, res) => {
    const body = req.body;
    
    try {
        const loginDB = new Login(body)
        await loginDB.save()
        //await Login.create(body)
        console.log(body)
        res.redirect('login')
        
    } catch (error) {
        console.log('error', error)
    }
})




module.exports = router;