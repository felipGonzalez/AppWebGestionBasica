const mongoose = require('mongoose')
const Shema = mongoose.Schema;
const  Role = require('../models/role')
const userSchema = new Shema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    rol: {
        name : String,
        level : Number
    },
    status: Boolean   
});

module.exports = mongoose.model('user',userSchema, 'Users')