const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2')
app.get('/', (req,res) => {
  var connection = mysql.createConnection(config)
  var sql = `CREATE TABLE IF NOT EXISTS people(name varchar(255), id int not null auto_increment, primary key(id));`
  connection.query(sql)
  var htmlReturn = '<h1>Full Cycle Rocks</h1>'
  htmlReturn += '</br></br>'  
  sql = `INSERT INTO people(name) values ('Daniel Carvalho')`
  connection.query(sql)
  connection.query("SELECT name FROM people", function (err, result, fields) {
    if (err) throw err;
    htmlReturn += '<h2> Resultados </h2>'
    Object.keys(result).forEach(function(key) {
      var row = result[key];        
      htmlReturn += '<span>' + row.name + '</span> </br>';
      console.log('<span>' + row.name + '</span> </br>')
    }); 
    connection.end()
    res.send(htmlReturn)        
  });    
})
app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})