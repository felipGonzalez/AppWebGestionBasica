const express = require('express');
const jwt = require('../verifyToken/jwt')
const router = express.Router();
const  User = require('../models/user')
const Log = require('../models/log')
const mongoose = require('../connection/Connection');
var ObjectId = mongoose.Types.ObjectId;
const message = require('../Const/Message');


router.post('/login', (req, res) => {
  let userData = req.body;
   console.log(userData);
   
  User.findOne({username: userData.username}, (error, user) => {
       if (error) {
           console.log(error);
       } else {
           if (!user) {
               res.status(401).send(message.MessageError.invalidEmail)
           } else {
               if (user.password !== userData.password) {
                   res.status(401).send(message.MessageError.invalidPassword)
              } else if( !user.status ) {
                res.status(401).send(message.MessageError.userStatus)
              } else {
                   let payload = {subject : user._id}
                   let token = jwt.jwt.sign(payload, 'secretKey')
                   res.status(200).send({token})
               }
           }
       }
  })
});

router.post('/count', (req, res) => {
  let nameData = req.body.name;
   console.log(nameData);
   
  User.count({'rol.name':nameData},(error, count) => {
       if (error) {
           console.log(error);
       } else {
        res.status(200).send({count:count})        
       }
  })
});


router.get('/user', jwt.verifyToken, (req,res) => {
  console.log(req.userId);
  
  User.find({_id: ObjectId(req.userId)},(error, user) => {
    if (error) {
      console.log();
    } else {
      console.log(user[0]);
      
      res.status(200).send(user[0])
    }
})  
});

//Obtener todos los usuarios
router.post('/data', (req, res) => {
    console.log("Entro");
    let levelUser = req.body.level
    console.log(levelUser);
    console.log(`Nivel de usuario : ${levelUser}`);
    User.find().where('rol.level').lte(levelUser).limit(10).exec((error, user) => {
        if( error) {
          console.log(error);
          
        }else {
          console.log();
          
          res.status(200).send(user)
        }      
    })
});

//Agregar Usuarios 
router.post('/add',(req, res) => {
    console.log(req.body);
    let userData = req.body;
    let user = new User(userData);

    user.save((error, registeredUser) => {
        if (error) {
            console.log(error);
            if (error.code === 11000)  res.status(500).send(message.MessageError.duplicate)
        } else {
               res.status(200).send({id:registeredUser._id})
        }
    });
});


//Editar Usuarios
router.put('/edit', jwt.verifyToken, (req, res) => {
    let userData = req.body;
    console.log(userData);
    
    User.updateOne({_id: ObjectId(userData._id)}, { password: userData.password,
        rol: { name : userData.rol.name,level :  userData.rol.level},
        status: userData.status},(error, user) => {
      if (error) {
        console.log(error);
        res.status(500).send(message.MessageError.dataInvalid);
      } else {
        if (!user) {
            res.status(500).send(message.MessageError.dataInvalid);
        } else {
            res.status(200).send({ok:'ok'})
          } 
      }
    });
})
//Eliminar usuario

router.post('/delete', jwt.verifyToken,(req, res) => {
  User.find({_id: req.body._id},(error, user) => {
    if (error) {
      console.log();
    } else {
      if (!user.length) {
        console.log("No exite el usuario");
        res.status(500).send(message.MessageError.dataInvalid);
      } else {
        console.log("existe el usuario");
        
        Log.find({user:user[0].username},(error, logs) => {
          console.log(user[0].username);
          if (error) {
              console.log(error);
            } else {
              console.log(logs);
              if(logs.length) {
                res.status(500).send(message.MessageError.notDeleteUser)
              } else {
                User.deleteOne({username: user[0].username},(error, user) => {
                  if (error) {
                    console.log(error);
                } else {
                    if (!user) {
                      res.status(500).send(message.MessageError.dataInvalid);
                    } else {
                        console.log(user);
                        
                        res.status(200).send({ok:'ok'})
                      } 
                  }
              });
              }
      
            }
        })

      }
      


    }
  })
})


module.exports = router;