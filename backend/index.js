const express = require('express');
const bodyParser = require("body-parser");
// const { Sequelize } = require('sequelize');
const mysql = require('mysql2');

const cors  = require("cors");


const app = express()
app.use(express.json());
app.use(bodyParser.json()); 
let todos = [];
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'TodoList',
  password:"Mysql123",
  port:3307
});

app.get('/', (req, res) =>{
	connection.query(
  'SELECT * FROM TODOS',
  function(err, results, fields) {
   res.json(results);
   console.log(results)
  }
);

});

app.post('/', (req, res) =>{
	const id = Math.round(Math.random()*100);

	connection.query(
  'INSERT INTO TODOS VALUES(?,?,0)',[id,req.body.todo],
  function(err, results, fields) {
   res.json(results);
  
  }
);
});

app.delete("/:id", (req, res) => {
	// todos = todos.filter(todo =>  todo.id != req.params.id 
	// )
	// res.send(todos)

	connection.query(
  'DELETE FROM TODOS WHERE id=?',[req.params.id],
  function(err, results, fields) {
   res.json(results);
  }
);

})

app.put("/:id", (req, res) => {
	// todos = todos.filter(todo =>  todo.id != req.params.id 
	// )
	// res.send(todos)

	connection.query(
  'UPDATE TODOS SET todo=? WHERE id=?',[req.body.todo,req.params.id],
  function(err, results, fields) {
   res.json(results);
   console.log(results);
  }
);
})

app.put("/:id", (req, res) => {
	// todos = todos.filter(todo =>  todo.id != req.params.id 
	// )
	// res.send(todos)

	connection.query(
  'UPDATE TODOS SET isDone=? WHERE id=?',[req.body.isDone,req.params.id],
  function(err, results, fields) {
   res.json(results);
   console.log(results);
  }
);

})


app.listen(5000, ()=>{
	console.log("listening on port 5000");
});



// const sequelize = new Sequelize('todo', 'root', 'Mysql@123', {
//   host: 'localhost',
//   dialect:'mysql'
// });

// try {
//    sequelize.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

module.exports = app;

