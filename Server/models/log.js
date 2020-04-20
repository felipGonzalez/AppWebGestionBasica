const mongoose = require('mongoose')
const Shema = mongoose.Schema;

const logSchema = new Shema({
    datetime: Date,
    user: String, 
    action: String  
});

module.exports = mongoose.model('log',logSchema, 'Logs')
