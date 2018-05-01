var mongoose  = require('mongoose');
require('./db');

var todoSchema = new mongoose.Schema({
    item: String
}, {
    collection: 'todos'
});

var Todo = mongoose.model('Todo', todoSchema);