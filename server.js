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

/*
var con = mysql.createConnection({
  host: "remotemysql.com",
  user: "oInlIDhHL4",
  password: "gfSWeNRSXp",
  database: "oInlIDhHL4"
});
//connect
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
*/
//connect
var db_config = {
  host: "remotemysql.com",
  user: "oInlIDhHL4",
  password: "gfSWeNRSXp",
  database: "oInlIDhHL4"
};

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  connection.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

// Setup Server

//const port = 8000;
const port = process.env.PORT || 8080

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

var sql = "INSERT INTO user (user, pass) VALUES ('"+request.body.user+"', '"+request.body.pass+"')";
con.query(sql, function (err, result) {
  if (err) throw err;
  console.log("1 record inserted");
});
  };
  
response.send({"lol":request.body});
});



    //Get Data
app.get('/', function (request, response) {
  //select from db
  var sql = "SELECT user , pass FROM user order by id desc limit 10";
  con.query(sql, function (err, result,fields) {
    if (err) throw err;
    console.log(result);
    lol = result;
  });
    response.send(lol);
  });
