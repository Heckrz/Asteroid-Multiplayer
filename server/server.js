import * from '../javascript/cw'
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Jagmeet@2002",
  database: "testnew"
});



/*
var name = "hello"; 
var num = 6;
*/



con.connect(function(err) {
    if (err) throw err;
    con.query("insert into testn values ("+score+",'"+username+"');", function (err, result, fields) {
        if (err) throw err;
      console.log(result);
    });
    con.query("SELECT * FROM testn", function (err, result, fields) {
        if (err) throw err;
      console.log(result);
    });
});