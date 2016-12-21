const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const md5 = require('md5')


var User = mongoose.model('User');


module.exports = (app) => {
    app.use('/user', router);
};

router.all('/list', async (req, res) => {
    //await User.remove({});
    var users = await User.find({});
    console.info(users)
    //渲染
    res.render('user/list', {
        data: {
            users,
        }

    });
})

router.get('/add', (req, res) => {
    res.render('user/add');
});

router.post('/add', async (req, res) => {
    var username = req.body.username;
    var pw = md5(req.body.pw || 233);
    console.info(username);
    var user = await User.findOne({ username });
    user = user ? user : new User();
    user.username = username;
    user.pw = pw;
    await user.save()
    res.redirect("/");
    //res.send("bommshakalaka")
});


router.get('/login', (req, res) => {
    //res.send("bommshakalaka")
    res.render('user/login', {
        data: {
            message: req.session.message || ""
        }

    })
});

router.post('/login', async (req, res) => {
    var username = req.body.username;
    var pw = md5(req.body.pw||233);
    var user = await User.findOne({ username });

    if (user.pw == pw) {
        req.session.message = "";
        req.session.user = user;
        var date = new Date();
        res.cookie('u',username, { expires: new Date(Date.now() + 90000000000)});
        res.cookie('d',date.getTime(),{ expires: new Date(Date.now() + 90000000000)});
        res.cookie('k',md5(username+date.getTime()+"boom"),{ expires: new Date(Date.now() + 90000000000)});
        res.redirect("/");
    }
    else {
        req.session.message = "登录失败";
        res.redirect("login");
    }

    //res.send("bommshakalaka")
});


router.get('/logout', (req, res) => {
    req.session.user = null;
    res.redirect("login")
})