const express = require('express');
const bodyParser= require('body-parser');
var userservice = require('./services/userservice');
var empservice = require('./services/empservice');


const app = express();



//CSS & Logos
app.use("/static", express.static(__dirname + '/asserts'));

//Body Parser
app.use(bodyParser.urlencoded({extended: true}))

//JSON Parser
app.use(bodyParser.json());

//Router
var router = express.Router();              

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use('/api', router);   

//app.set('view engine', 'hjs');
//app.engine('html', require('hjs').renderFile);

app.listen(3000, function() {
  console.log('listening on 3000')
})


//Filter Logic
router.use(function(req, res, next) {
    console.log('Recieved request for '+req.url);
    next(); // make sure we go to the next routes and don't stop here
});

router.post('/login', (req, res) => {
  console.log(' Email '+ req.body.email + ' :  Password ' + req.body.upassword);
  userservice.checkForCredentials(req.body.email, req.body.upassword, function(err,result){    
    
    if (err) throw err;
    
    console.log(' Result ====> ' + result);
    res.setHeader('Content-Type', 'application/json');
    var allData={'isValidUser' :result};
    res.write(JSON.stringify(allData));
    res.end();
    
  });
})


router.get('/allemployees', (req, res) => {

  empservice.getAllEmployees(function(err,empList){
        console.log('Get All Employee List ');
        console.log(empList);
        res.setHeader('Content-Type', 'application/json');
        var allData={'empList' :empList};
        res.send(JSON.stringify(allData));
  });

})

router.post('/employee', (req, res) => {
  console.log(req.body.employee);
  var employee = req.body.employee;
  empservice.addEmployee(employee.eno,employee.ename,employee.salary,employee.project,function(err,result){
        res.setHeader('Content-Type', 'application/json');
        var allData={'isRecordInserted' :result};
        res.send(JSON.stringify(allData));
  });
})