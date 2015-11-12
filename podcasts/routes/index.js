var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var request = require('request');

var DIR = 'views/';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile(DIR + 'index.html');
});



// TODO : fix c++ / c# bug


router.get('/search/:field', function(req, res, next) {
  var search = req.params.field.replace('+', '%2B')
  search = search.replace(' ', '+')
  search = search.replace('#', '%23')
  console.log('search', search)
  
  request('https://itunes.apple.com/search?term=' + search + '&entity=podcast', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log(body) // Show the HTML for the Google homepage.
      res.json(body);
    }
    else {
      res.json({
        error: true,
      })
    }
  })
})


// TODO: move this to mongo

var SUGGESTIONS = [
  'java',
  'javascript',
  'html',
  'css',
  'c++',
  'c#',
  'node',
  'nodejs',
  'jquery',
  'json',
  'angular',
  'angularjs',
  'react',
  'reactjs',
  'amber',
  'rest',
  'developer',
  'web',
  'web developer',
  'programming',
  'development',
  'develop',
  'program',
  'code',
  'mongo',
  'mongodb'
]


router.get('/suggestions/:field', function(req, res, next) { 
  var str = req.params.field
  console.log('suggestions', str)
  var sug = SUGGESTIONS.filter(function(s){
    var len = str.length;
    if (str == s.substring(0, len))
    {
      return true;
    }
    return false;
  })
  res.json(sug)
})



module.exports = router;
