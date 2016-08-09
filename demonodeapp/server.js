const express = require('express');
const bodyParser= require('body-parser');
var userservice = require('./services/userservice');


const app = express();



//CSS & Logos
app.use("/static", express.static(__dirname + '/asserts'));

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))

//JSON Parser
app.use(bodyParser.json());

//Router
var router = express.Router();     

app.use('/', router);         
//app.set('view engine', 'ejs');
//app.engine('html', require('ejs').renderFile);


app.set('view engine', 'hjs');
app.engine('html', require('hjs').renderFile);

app.listen(3000, function() {
  console.log('listening on 3000')
})

router.use(function(req, res, next) {
    log('Recieved request for '+req.url);
    next(); // make sure we go to the next routes and don't stop here
});


/*app.get('/', function (req, res) {
  res.send('Hello World 123');
})*/

//ES6 View Login Page
app.get('/home', (req, res) => {
  console.log('Hello Request !!!!');
  //res.send('hello world')

  //res.sendFile(__dirname+'/views/index.html')
  //res.sendFile(__dirname+'/views/login.html')
 // res.render(__dirname+'/views/login.html',{userid:'NodeJSDynamicData'})
 res.render(__dirname+'/views/index.html',{userid:'NodeJSDynamicData'})
})

app.post('/login', (req, res) => {
  console.log(' Email '+ req.body.email + ' :  Password ' + req.body.upassword);
  userservice.checkForCredentials(req.body.email, req.body.upassword, function(err,result){
    
    if (err) throw err;

    console.log(' Result ====> ' + result);
    
    if(result){
      console.log('5 Result' + result);
    }else{
      console.log('6 Not a Valid User');
    }
    res.end();
  });
})

//Login 
/*app.post('/login', (req, res) => {
  console.log(req.body);
  userservice.checkForCredentials(err,function(req.body.email, req.body.upassword){
    console.log(' Result' + result);
    if(result){
      console.log(' Result' + result);
    }else{
      console.log('Not a Valid User');
    }
  });
})*/