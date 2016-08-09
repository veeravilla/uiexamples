var express = require('express');
var userservice = require('./services/userservice');
const bodyParser= require('body-parser');
var app = express();


//Router
var router = express.Router();    

//CSS & Logos
app.use("/static", express.static(__dirname + '/asserts'));

//Templates
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//app.set('view engine', 'hjs');
//app.engine('html', require('hjs').renderFile);

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))


//JSON Parser
app.use(bodyParser.json());

app.use('/api', router);  

//Server Start
app.listen(3000, function() {
  console.log('Server !!!! is up & Running');
});


router.post('/login', function(req, res) {
  console.log(req.body);
  console.log(' User Name ' + req.body.uname);
  console.log(' Password' + req.body.password);

  //Service Call
  userservice.checkForCredentials(req.body.uname, req.body.password, function(err,result){
  	console.log(' Result ====> ' + result);
    res.setHeader('Content-Type', 'application/json');
    var allData={'isValidUser' :result};
    res.write(JSON.stringify(allData));
    res.end();
  });
  
});