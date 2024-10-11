// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Parse JSON
app.use(bodyParser.json());

// Read comments from file and return them
app.get('/comments', function(req, res) {
  fs.readFile('comments.json', function(err, data) {
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
});

// Write comments to file
app.post('/comments', function(req, res) {
  fs.writeFile('comments.json', JSON.stringify(req.body), function(err) {
    res.setHeader('Content-Type', 'application/json');
    res.send(req.body);
  });
});
