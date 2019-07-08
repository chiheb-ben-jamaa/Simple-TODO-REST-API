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
 


//connection configurations:
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todo_db'
});
 
// connect to database
mc.connect();






 
// default route
app.get('/', function (req, res) {
    console.log('testing The API !')
    return res.send({ error: true, message: 'Texting The API ' })
});


const PORT = process.env.PORT || 3030;

// port must be set to 3030 because incoming http requests are routed from port 80 to port 8080
app.listen(PORT, function () {
    console.log('Node app is running on port 3030');
});






// Retrieve all todos 
app.get('/todos', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos list.' });
        //return res.send({ results });
        
        //TODO: try to send the res with josn format :
        return res.json(results);
            

    });
});




// Retrieve todo with id 
app.get('/todos/:id', function (req, res) {
 
    let task_id = req.params.id;
 
    if (!task_id) {
        return res.status(400).send({ error: true, message: 'Please provide task_id' });
    }
 
    mc.query('SELECT * FROM tasks where id=?', task_id, function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results[0], message: 'Todos list.' });
        return res.json(results[0]);

    });
 
});




// Search for todos with ‘id’ as keyword
app.get('/todos/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM tasks WHERE description LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos search list.' });
        return res.json(results);
    });
});


// Search for todos with ‘id’ as keyword
app.get('/todos/search/category/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM tasks WHERE category LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos search list.' });
        return res.json(results);
    });
});







// Add a new todo  
app.post('/todo/addtask', function (req, res) {
 
    
var Newtask = {
    description: req.pay.description,
    category: req.body.category,
    time:req.body.time
};
    //let task = req.body.task;
 
    if (!Newtask) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }
 
    mc.query("INSERT INTO tasks SET ? ", Newtask, function (error, results, fields) {
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });
    });
});




