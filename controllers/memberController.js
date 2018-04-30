const mongoose = require('mongoose');
const bodyParer = require('body-parser');
const bcrypt = require('bcrypt');
require('dotenv').config();
require('../lib/db');

const urlencodeParser = bodyParer.urlencoded({ extended: false });

const Member = mongoose.model('Member');

module.exports = function (app) {
    app.get('/singup', function (req, res, next) {
        Member.find({}, function (err, data) {

            // const saltRounds = 10;
            // const myPassword = '123456789';
            // const hash = bcrypt.hashSync(myPassword, saltRounds);
            // console.log(myPassword);
            // console.log(hash);
            // console.log(bcrypt.compareSync(myPassword, hash));

            res.render('singup');
        });
    });

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

    app.get('/login', function (req, res) {
        Member.find({}, function (err, data) {
            res.render('login');
        });
    });

    app.post('/login', urlencodeParser, function (req, res) {
        //res.json(req.body);
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
                //console.log(bcrypt.compareSync(myPassword, data.password));
                res.json({ message: loginMessage });
            }
        });
    });
}