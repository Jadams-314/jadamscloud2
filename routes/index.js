var express = require('express');
var router = express.Router();
var path = require('path');

// Connect to process.env.DATABASE_URL when your app initializes:
// Read only reference value (const)
// get only Client class from pg package
const Client = require('pg').Client;

// create an instance from Client
const client = new Client({
  connectionString: process.env.DATABASE_URL
});

// connect to the DATABASE_URL
client.connect();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/car', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','car.html'));
});

router.get('/carOut', function(req, res, next) {
  // client object enables issuing SQL queries
  client.query('SELECT * FROM car', function(err, result){
    if (err) {next(err);}
    res.json(result.rows);
    console.log(result.rows);
  });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// for madlibs
router.get('/madlibs', function(req, res, next) {
  res.sendFile(path.join(__dirname,'..', 'public','madlibs.html'));
});

router.post('/madlibs', function(req, res) {
  console.log (req.body);
  res.json({ 
    cloth: " " + req.body.cloth,
    female1: " " + req.body.female1,
    female2: " " + req.body.female2,
    male1: " " + req.body.male1,
    male2: " " + req.body.male2,
    nounf: "On Tuesdays " + req.body.nounf,
    nounm: "On Thursdays " + req.body.nounm
  });
});
module.exports = router;
