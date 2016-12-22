const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


module.exports = (app) => {
    app.use('/', router);
};


router.all('/', async (req, res) => {

    //渲染
    res.render('index/index', {
        data: {
            a:1,
        }
    });
    
})