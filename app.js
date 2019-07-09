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
 

app.use('/api/',require('./routes/api/defoult'));
app.use('/api/tasks',require('./routes/api/tasks'));


/*
const PORT = process.env.PORT || 3030;
//server start 
app.listen(PORT, function () {
    console.log('Node app is running on port 3030');
});
*/

//define post for deployment prupoes
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("App is running on port " + port);
  });








