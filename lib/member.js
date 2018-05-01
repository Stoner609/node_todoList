const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
require('./db');

var memberSchema = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    password: {
        type: String,
        default: '',
    },
}, {
    collection: 'members'
});


memberSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, 10);
}

memberSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Member', memberSchema);
