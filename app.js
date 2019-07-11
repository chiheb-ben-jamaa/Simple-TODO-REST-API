const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan=require('morgan')
app.use(morgan('combined'))



//init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 

//static files
app.use(express.static('./public'));
app.use('/api/tasks',require('./routes/api/tasks'));


// default route
app.get('/', function (req, res) {
    console.log('testing The API !')
    res.redirect('/api/tasks/todo/');
});




//define post for deployment prupoes
const PORT = process.env.PORT || 3030;
//server start 
app.listen(PORT, function () {
    console.log('Node app is running on port 3030');
});






  module.exports = app;
