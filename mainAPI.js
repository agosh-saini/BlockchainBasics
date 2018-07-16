var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});

con.connect(function(err) {
  //checking to see if the connection is established
  if (err) throw err;
  console.log("Connected!");

    //creating Database
  con.query('CREATE DATABASE withdrawls ', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Database Created");
  });
    //using Database
  con.query('USE withdrawls', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Using withdrawals");
  });

      //using Database
  con.query('CREATE TABLE customerWithdrawls (withdrawalID varchar(255), amount varchar(255), wallet varchar(255))', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Created Table");
  });

      //Dinserting information into Database
  con.query("INSERT INTO customerWithdrawls (withdrawalID, amount, wallet) VALUES ('1bc', '1', '1a9')", 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Added transaction to database");
  })

  con.query("INSERT INTO customerWithdrawls (withdrawalID, amount, wallet) VALUES ('123', '2', '11aa')", 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Added transaction to database");
  })
 });


app.use(bodyParser.urlencoded({ extended: true })); 

//Posting Informatioing to the databse
app.post('/addtrans', function(req, res) {
 	res.send(req.body);

  		con.query("INSERT INTO customerWithdrawls (withdrawalID, amount, wallet) VALUES ('"+req.body.transid+"', '"+req.body.amount+"', '"+req.body.wallet+"')", 
  			function(error, results, fields) {
			if (error) throw error;
				console.log("added trans");
  		}); 

});


//Getting Information from Database
app.get('/getstatus', function(req, res) {
	var trans_id = req.param('id');
	

    //selecting information from database Database
  		con.query('SELECT * FROM customerWithdrawls WHERE withdrawalID IN ("' + trans_id + '")', 
  			function(error, results, fields) {
			if (error) throw error;
				console.log("Returning Results: ", results);
				res.json(results);
  		}); 
});

//Starting Session at Localhost:8080
app.listen(8080, function() {
 	console.log('Server running at http://127.0.0.1:8080/');
});

