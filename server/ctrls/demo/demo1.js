const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");


module.exports = (app) => {
    app.use('/demo/demo1', router);
};

router.all('/func1', (req, res) => {
   res.send({ddd:2})
})