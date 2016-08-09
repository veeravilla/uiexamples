var express = require('express');
var userservice = require('./services/userservice');
const bodyParser= require('body-parser');
var app = express();


//CSS & Logos
app.use("/static", express.static(__dirname + '/asserts'));

//Templates
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//app.set('view engine', 'hjs');
//app.engine('html', require('hjs').renderFile);

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))


//Server Start
app.listen(3000, function() {
  console.log('Server !!!! is up & Running');
});

// Landing Page/ Home Page
app.get('/', function(req, res) {
 res.render(__dirname+ '/index.html',{isError:false});
 //res.render(__dirname+ '/landing.html',{mydata:'Welcome to My Application'});
});


app.get('/home', function(req, res) {
 res.sendFile(__dirname+ '/index.html');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  console.log(' User Name ' + req.body.uname);
  console.log(' Password' + req.body.password);
  console.log(' Remeber ' + req.body.isRemember);
  console.log('Success full Login');
  //Service Call
  userservice.checkForCredentials(req.body.uname, req.body.password, function(err,result){
  		console.log("Result    " + result);
  		if(result){
  			res.render(__dirname+ '/landing.html',{mydata:req.body.uname});
  		}else{
  			console.log('Login Failed');
  			res.render(__dirname+ '/index.html',{isError:true});
  		}
  });
  
});