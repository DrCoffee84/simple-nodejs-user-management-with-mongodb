var express = require('express');
var router = express.Router();

process.on('uncaughtException', function (err) {
  console.log('Caught exception: ', err);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simple Express MongoDB Application' });
});

module.exports = router;
