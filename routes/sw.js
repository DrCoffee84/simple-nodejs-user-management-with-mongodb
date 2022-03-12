var express = require('express');
var request = require('request');
var router = express.Router();

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  var options = {
    'method': 'GET',
    'url': 'https://swapi.dev/api/people/1/',
    'headers': {
    }
  };

  
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.send(response.body);
  });
  
});

module.exports = router;
