const mongoose = require('mongoose');
const bodyParer = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('../lib/db');

const urlencodeParser = bodyParer.urlencoded({ extended: false });

const Member = mongoose.model('Member');

module.exports = function (app) {
    // 會員註冊頁面
    app.get('/singup', function (req, res, next) {
        Member.find({}, function (err, data) {
            res.render('singup');
        });
    });

    // 會員註冊
    app.post('/singup', urlencodeParser, function (req, res) {
        const saltRounds = 10;
        const myPassword = req.body.password;
        const hash = bcrypt.hashSync(myPassword, saltRounds);

        var itemMember = Member({
            email: req.body.email,
            password: hash
        }).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });
    
    // 會員登入首頁
    app.get('/login', function (req, res) {
        Member.find({}, function (err, data) {
            res.render('login');
        });
    });

    // 會員登入
    app.post('/login', urlencodeParser, function (req, res) {
        const myPassword = req.body.password;

        Member.findOne({
            email: req.body.email
        }, function (err, data) {
            if (err) throw err;

            let loginMessage = '';
            if (data == null) {
                loginMessage = '查無此使用者';
                res.json({ message: loginMessage })
            } else {
                const loginBool = bcrypt.compareSync(myPassword, data.password);
                if (loginBool) {
                    loginMessage = '登入成功';
                } else {
                    loginMessage = '登入失敗';
                }
                res.json({ message: loginMessage });
            }
        });
    });
}