var bodyParer = require('body-parser');
var mongoose  = require('mongoose');

var urlencodeParser = bodyParer.urlencoded({ extended: false });

mongoose.connect('mongodb://stoner:123@ds127564.mlab.com:27564/todo');

var todoSchema = new mongoose.Schema({
    item: String
});
var Todo = mongoose.model('Todo', todoSchema);

module.exports = function (app) {
    app.get('/todo', function (req, res) {
        Todo.find({}, function (err, data) {
            res.render('todo', { todos: data });
        });
    });

    app.post('/todo', urlencodeParser, function (req, res) {
        var itemOne = Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        Todo.find({ item: req.params.item.replace(/-/g, ' ') }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
}