const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


module.exports = (app) => {
    app.use('/', router);
};


router.all('*', async (req, res,next) => {
    if(req.session.user){
        next()
    }
    else{
        if(/user\/(login|list|add)/.test(req.url)){
            next();
        }
        else{
            res.redirect("/user/login");
        }
       
    }
    
    
})