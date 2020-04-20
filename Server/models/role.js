const mongoose = require('mongoose')
const Shema = mongoose.Schema;

const roleSchema = new Shema({
    name: String,
    level: Number,   
});

module.exports = mongoose.model('role',roleSchema, 'Roles')
