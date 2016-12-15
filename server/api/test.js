const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var TestObj = mongoose.model('TestObj', new Schema({
    boom: String,
    date: Date
}));


module.exports = (app) => {
    app.use('/api/test', router);
};

router.all('/', (req, res) => {
    res.send({ a: 233 })
})

router.all('/dbtest', async (req, res) => {
    var testObj =  new TestObj();
    testObj.boom=Math.random()+"BOOM";
    testObj.date=new Date();
    await testObj.save();
    var tests = await TestObj.find();
    res.send(tests)

    //testObj.
})