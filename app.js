const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan=require('morgan')
app.use(morgan('combined'))


//adding this from heroku doc :
const cool = require('cool-ascii-faces')
const path = require('path')




//init
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
 

//static files
app.use(express.static('./public'));
app.use('/api/tasks',require('./routes/api/tasks'));



app.get('/', function (req, res) {
    console.log('testing The API !')
    res.redirect('/api/tasks/todo/');
});



// all other requests redirect to 404
app.all("*", function (req, res, next) {
    return res.send('page not found');
    next();
});
 



//define post for deployment prupoes
const PORT = process.env.PORT || 3030
//server start 
app.listen(PORT, () => {
    console.log(`Listening on ${ PORT }`);
});



  module.exports = app;
