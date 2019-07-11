const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const morgan=require('morgan')
//using the router :
const router = express.Router();



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





router.get('/todo',function(req,res){
    return res.send({ error: true, message: 'Texting The API ' })
});




// Retrieve all todos 
router.get('/todos', function (req, res) {
    mc.query('SELECT * FROM tasks', function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos list.' });
        //return res.send({ results });
        
        //TODO: try to send the res with josn format :
        return res.json(results);
            

    });
});









// Retrieve todo with id 
router.get('/todos/:id', function (req, res) {
 
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
router.get('/todos/search/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM tasks WHERE description LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos search list.' });
        return res.json(results);
    });
});











// Search for todos with ‘category’ as keyword
router.get('/todos/category/:keyword', function (req, res) {
    let keyword = req.params.keyword;
    mc.query("SELECT * FROM tasks WHERE category LIKE ? ", ['%' + keyword + '%'], function (error, results, fields) {
        if (error) throw error;
        //return res.send({ error: false, data: results, message: 'Todos search list.' });
        return res.json(results);
    });
});











// Add a new todo  
router.post('/todos/addtask', function (req, res) {


    const data = {
        description: req.body.description,
        category: req.body.category,
        time: req.body.time,
       
      }

    var errors=[]
    if (!req.body.description){
        errors.push("No description specified");
    }
    if (!req.body.category){
        errors.push("No category specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

  

 const querystring ="INSERT INTO tasks (description, category, time) VALUES (?,?,?)"

 /*
    if ((!description)&&(!category)&&(!time)) {
        return res.status(400).send({ error:true, message: 'Please provide task' });
    }
*/
 
    mc.query(querystring,[data.description,data.category,data.time],function (error, results, fields) {
        if(error) throw error;
        return res.send({ error: false, data: results, message: 'New task has been created successfully.' });

        });

      });





//delete todo with id 
router.delete('/todos/delete/:id', function(req,res){
    
    let delete_task_id =req.params.id
    mc.query('DELETE FROM tasks WHERE id = ?',[delete_task_id], function (error, results, fields){
        if (error) throw error;
        return res.send({ error: false, data: results, message: 'The task has been delete successfully.' });
    });

});




//update todo with id





module.exports = router;
