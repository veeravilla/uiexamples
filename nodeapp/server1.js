var express = require('express');
var app = express();


//Server Start
app.listen(3000, function() {
  console.log('Server !!!! is up & Running');
});

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
  res.send('hello world 1233');
});

app.get('/home', function(req, res) {
  username="Jhon";
  res.sendFile(__dirname+ '/demo.html',username);
});

app.get('/insert', function(req, res) {
  res.send('Insert Page');
});

app.get('/delete', function(req, res) {
  res.send('Delete Page');
});