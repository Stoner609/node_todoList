const mongoose = require('mongoose');
const bodyParer = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Member = require('../lib/member');

const urlencodeParser = bodyParer.urlencoded({ extended: false });

module.exports = function (app) {
    // 會員註冊頁面
    app.get('/singup', function (req, res, next) {
        Member.find({}, (err, data) =>  {
            res.render('singup');
        });
    });

    // 會員註冊
    app.post('/singup', urlencodeParser, function (req, res, next) {
        const { body } = req;
        let {
            name,
            email,
            password
        } = body;
        
        /**
         * 驗證
         */
        if (!name) {
            return res.json({
                success: false,
                message: 'Error: name can not empty',
            });
        }

        if (!email) {
            return res.json({
                success: false,
                message: 'Error: email can not empty',
            });
        }

        if (!password) {
            return res.json({
                success: false,
                message: 'Error: password can not empty',
            });
        }

        /**
         * Insert Database
         */
        email = email.toLowerCase();
        Member.find({
            email: email
        }, (err, data) => {
            if(err) throw err;
            if(data.length >= 1) {
                return res.json({
                    success: false,
                    message: '重複'
                });
            } 

            const newMember = new Member();
            newMember.name = name;
            newMember.email = email;
            newMember.password = newMember.generateHash(password);
            newMember.save((err, date)=> {
                if (err) throw err;
                res.json({
                    success: true,
                    message: '註冊成功'
                });
            });
        });
    });
    
    // 會員登入首頁
    app.get('/login', function (req, res) {
        Member.find({}, (err, data) => {
            res.render('login');
        });
    });

    // 會員登入
    app.post('/login', urlencodeParser, function (req, res) {
        const { body } = req;
        let {
            email,
            password
        } = body;

        /**
         * 驗證
         */
        if (!email) {
            return res.json({
                success: false,
                message: 'Error: email can not empty',
            });
        }

        if (!password) {
            return res.json({
                success: false,
                message: 'Error: password can not empty',
            });
        }

        /**
         * 比對
         */
        email = email.toLowerCase();
        Member.find({
            email: email
        }, (err, data) => {
            if (err) throw err;
            if (data.length != 1) {
                return res.json({
                    success: false,
                    message: 'Error: email or password is wrong'
                });
            }

            const loginMember = data[0];
            if (!loginMember.validPassword(password) ){
                return res.json({
                    success: false,
                    message: 'Error: Shit'
                });
            }else{
                var Token = jwt.sign({
                    id: data[0]._id,
                    name: data[0].name,
                    admin: true
                }, process.env.SECRET, {
                    expiresIn: 1000*60*2
                });

                res.json({ 
                    success: true,
                    message: '登入成功',
                    Token: Token
                });
            }
        });

        /**
         * 發送token
         */

    });
}