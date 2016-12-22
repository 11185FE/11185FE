const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const md5 = require('md5');
const mongoose = require('mongoose');
module.exports = (app) => {
    app.use('/', router);
};

var User = mongoose.model('User');


router.all('*', async (req, res,next) => {
    var u = req.cookies["u"];
    var d = req.cookies["d"];
    var k = req.cookies["k"];
    var passDate = new Date(parseInt(d))
    passDate.setDate(360)
    if(k==md5(u+d+"boom")&&new Date()<passDate){
        var user = await User.findOne({ username:u });
         req.session.user = user;
        next()
    }

    else if(req.session.user){
        next()
    }
    else{
        if(/user\/(login|add)/.test(req.url)){
            next();
        }
        // else if(/job\/(list)/.test(req.url)){
        //     next();
        // }
        else{
            res.redirect("/user/login");
        }
       
    }
    
    
})