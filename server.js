// Setup empty JS object to act as endpoint for all routes
var lol ;
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Dependencies */
const bodyParser = require('body-parser')
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "oInlIDhHL4",
  password: "gfSWeNRSXp",
  database: "oInlIDhHL4"
});

// Setup Server

//const port = 8000;
const port = process.env.PORT || 80

const server = app.listen(port, listening);
function listening(){
    console.log("server running"); 
    console.log('running on localhost: '+port);
}


  //Get Data
app.post('/test', function (request, response) {
    if(request.body.pass || request.body.user){
/*     lol = {
    
    "user":request.body.user ? request.body.user : lol.user,
    "pass":request.body.pass ? request.body.pass : lol.pass
  } */
  // insert into db
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO user (user, pass) VALUES ('"+request.body.user+"', '"+request.body.pass+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });

});
  };
  
response.send({"lol":request.body});
});



    //Get Data
app.get('/', function (request, response) {
  //select from db
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT user , pass FROM user order by id desc limit 1";
  con.query(sql, function (err, result,fields) {
    if (err) throw err;
    console.log(result);
    lol = result;
  });

});
    response.send(lol);
  });