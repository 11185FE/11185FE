const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

const mongoose = require('mongoose');
var TestObj = mongoose.model('TestObj');


module.exports = (app) => {
    app.use('/test', router);
};


router.all('/', async (req, res) => {
    //添加到数据库
    var testObj = new TestObj();
    testObj.boom = Math.random() + "BOOM";
    testObj.date = new Date();
    await testObj.save();

    //查
    var tests = await TestObj.find();

    //渲染
    res.render('test/index', {
        data: {
            // title: 'Express Vue',
            tests,
            message: 'Hello!',
        },
        vue: {
            meta: {
                title: 'It will be a pleasure',
            },
            components: ['message']
        }
    });
})


router.all('/shabee', (req, res) => {
    res.send("bommshakalaka")
})

var exec = require('child_process').exec;
router.all('/svn', (req, res) => {
    exec('svn', ['help'], function (err, stdout, stderr) {
        res.send(arguments);
    })
})
router.all('/node', (req, res) => {
    exec('node --version', function (err, stdout, stderr) {
        res.send(arguments);
    })
})