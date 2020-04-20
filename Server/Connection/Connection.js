const db = "mongodb+srv://afelipgb:10491998@cluster0-w2uwe.gcp.mongodb.net/db?retryWrites=true&w=majority"
const mongoose = require('mongoose');

mongoose.connect(db, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },err => {
    if (err) {
        console.error('Error!'+ err);
    } else {
        console.log('Connected to mongodb');
    }
 });

 module.exports = mongoose;