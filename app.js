const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan=require('morgan')
app.use(morgan('combined'))


path = require('path');


//init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 

app.use('/api/tasks',require('./routes/api/tasks'));


// default route
app.get('/', function (req, res) {
    console.log('testing The API !')
    return res.send({ error: true, message: 'Texting The API ' })
});




//define post for deployment prupoes
const PORT = process.env.PORT || 5000

app.listen(PORT, function(){
    console.log('listening on *:5000');
  });






  module.exports = app;
