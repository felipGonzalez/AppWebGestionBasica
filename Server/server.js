const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const port = 3001;
const apiRole = require('./routes/apiRole')
const apiLog = require('./routes/apiLog')
const apiUser = require('./routes/apiUser')
const app = express();

app.use(bodyParser.json()); 
app.use(cors())

app.use('/role', apiRole)
app.use('/log', apiLog)
app.use('/user', apiUser)
app.get('/', function(req,res){
    res.send("Hello from server")
});

app.listen(port, function(){
    console.log(`Server running on localhost ${port}`);
});