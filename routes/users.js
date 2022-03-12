var express = require('express');
var router = express.Router();
const config = require('config');
var validate = require('express-jsonschema').validate;
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://"+config.get('mongodb.host')+"/taglatam";
var count = 1;

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});


var PersonSchema = {
  type: 'object',
  properties: {
      lastname: {
          type: 'string',
          required: true
      },
      name: {
          type: 'string',
          required: true
      },
      email: {
          type: 'string',
          required: true
      }
  }
}


/* GET users listing. */
router.get('/', function(req, res, next) {

  if ( count % 5 == 0 ){
    count=1
    res.status(500).json({message: "Every 5 request I will fail!"}).send()
  }else{
    count++
    var resultResponse = []; 
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("taglatam");
      dbo.collection("users").find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
        db.close();
      });
    });
  }

});


/* POST user listing. */
router.post('/', validate({body: PersonSchema}),function(request, response){
  console.log(request.body);      // your JSON
  var response;

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("taglatam");
    dbo.collection("users").insertOne(request.body, function(err, res) {
      if (err) {
        res.status(400).send("Error inserting matches!");
      };
      console.log("1 document inserted");
      response.send(res);    // echo the result back
      db.close();
    });
  });

});

module.exports = router;
