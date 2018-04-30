var mongoose  = require('mongoose');
mongoose.connect(process.env.DB_CONNECT);

// 單筆資料
var todoSchema = new mongoose.Schema({
    item: String
}, {
    collection: 'todos'
});

// 會員資料
var memberSchema = new mongoose.Schema({
    email: String,
    password: String
}, {
    collection: 'members'
});


var Todo = mongoose.model('Todo', todoSchema);
var Member = mongoose.model('Member', memberSchema);
