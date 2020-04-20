const express = require('express');
const jwt = require('../verivyToken/jwt')
const router = express.Router();
const  Log = require('../models/log')
const mongoose = require('../connection/Connection');
var ObjectId = mongoose.Types.ObjectId;
const message = require('../Const/Message');

//Obtener Historial de acciones 
router.get('/data', (req, res) => {
    Log.find((error, logs) => {
        res.status(200).send(logs)
    })
});

//Obtener Historial de acciones 
router.get('/actionsHistory', (req, res) => {
    Log.find().nor([{action:message.Actions.initSession},{action:message.Actions.closeSession}])
    .sort({datetime:-1}).
    limit(10)
    .exec((error, logs) => {
        res.status(200).send(logs)
    })
});

//Obtener Historial de sesion 
router.get('/sessionHistory', (req, res) => {

    Log.find({action:message.Actions.initSession}).sort({datetime:-1}).limit(10).exec((err, logs) => { res.status(200).send(logs) });

});


//Agregar logs
router.post('/add', jwt.verifyToken, (req, res) => {
    let logData = req.body;
    let log = new Log(logData);
    console.log(log);
    log.save((error, registeredLog) => {
        if (error) {
            console.log(error);
            res.status(200).send(error)    
        } else {
               res.status(200).send({id:registeredLog._id})
        }
    });
});

module.exports = router;