var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var jsonParser = bodyParser.json();
var urlencodeParser = bodyParser.urlencoded({extended: false});

app.get('/', function(req, res, next) {
    var responseObject = {
        name: 'stoner'
    }
    console.log(req.method);
    console.log(req.query.name);
    res.send( JSON.stringify(responseObject));
});

app.post('/', function(req, res, next) {
    console.log(req.body);
    res.send(req.body.name);
});

app.post('/jsonParser', jsonParser, function(req, res, next) {
    console.log(req.body);
    res.send(req.body.name);
});

app.get('/info/:id', function(req, res, next) {
    res.send('You request to see a info with the id of ' + req.params.id);
});



app.listen(3000);
console.log('listening to port 3000');