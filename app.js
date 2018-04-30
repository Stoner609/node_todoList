var express = require('express');
var todoController = require('./controllers/todoController');
var memberController = require('./controllers/memberController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'))
todoController(app);
memberController(app);

app.listen(process.env.PORT || 3000)

console.log('listening to port 3000');