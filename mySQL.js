var mysql = require('mysql');

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
  con.query('CREATE DATABASE withdrawls', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Database Created");
  }); 
     //Using withdrawls
  con.query("USE withdrawls",
    function(error, results, fields) {
	if (error) throw error;
	console.log("Using Withdrawl");
  });

  //Adding a colloum called withdrawalID, amount and wallet with withdrawalID being Primary Key
  con.query('CREATE TABLE customerWithdrawls (withdrawalID VARCHAR(255) PRIMARY KEY, amount INT, wallet VARCHAR(255))', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Created withdrawalID, amount, and wallet");
  });
  
   //Adding a withdrawl to the databse
  con.query("INSERT INTO customerWithdrawls (withdrawalID, amount, wallet) VALUES ('1bc', '1', '1a9')",
    function(error, results, fields) {
	if (error) throw error;
	console.log("Added Withdrawl");
  });

   //Printing Those Records
  con.query('SELECT * FROM customerWithdrawls', function(error, results, fields) {
	if (error) throw error;
	console.log(results);
  });
 
   //Dealting Database
  con.query('DROP DATABASE withdrawls', 
  	function(error, results, fields) {
	if (error) throw error;
	console.log("Database Dropped");
  }); 

  // ending connection
     //Dealting Database
  con.end(function(error, results, fields) {
	if (error) throw error;
	console.log("Connection Ended");
  }); 
});

