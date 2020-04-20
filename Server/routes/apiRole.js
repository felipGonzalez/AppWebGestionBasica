const express = require('express');
const jwt = require('../verivyToken/jwt')
const router = express.Router();
const  Role = require('../models/role')
const mongoose = require('../connection/Connection');
var ObjectId = mongoose.Types.ObjectId;
const message = require('../Const/Message');

//Obtener todos los roles
router.post('/dataLevel', jwt.verifyToken, (req, res) => {
  let levelUser = req.body.level
  console.log(levelUser);
  
  console.log(`Nivel de usuario : ${levelUser}`);
  Role.find().where('level').lte(levelUser).exec((error, role) => {
    if(!role) {
      res.status(500).send(message.MessageError.notDataRole)
    }    
    res.status(200).send(role)
  })
});

//Obtener todos los roles
router.get('/data', jwt.verifyToken, (req, res) => {
  Role.find().limit(10).exec((error, role) => {
    if(!role) {
      res.status(500).send(message.MessageError.notDataRole)
    }    
    res.status(200).send(role)
  })
});



//Agregar Roles 
router.post('/add', (req, res) => {
    console.log(req.body);
    let roleData = req.body;
    let role = new Role(roleData);
    console.log(role);
    role.save((error, registeredRole) => {
        if (error) {
            console.log(error);
            if (error.code === 11000)  res.status(500).send(message.MessageError.duplicate)
        } else {
               res.status(200).send({id:registeredRole._id})
        }
    });
});

//Editar roles
router.put('/edit', (req, res) => {
    let roleData = req.body;
    console.log(roleData);
    
    Role.updateOne({_id: ObjectId(roleData._id)},{level: roleData.level, name: roleData.name},(error, role) => {
      if (error) {
        console.log(error);
        res.status(500).send(message.MessageError.dataInvalid);
      } else {
        if (!role) {
            res.status(500).send(message.MessageError.dataInvalid);
        } else {
            res.status(200).send({ok:'ok'})
          } 
      }
    });
  })


  router.post('/delete', (req, res) => {
    Role.deleteOne({_id: req.body._id},(error, role) => {
      if (error) {
        console.log(error);
    } else {
        if (!role) {
          res.status(500).send(message.MessageError.dataInvalid);
        } else {
            res.status(200).send({ok:'ok'})
          } 
      }
  });
  })

module.exports = router;