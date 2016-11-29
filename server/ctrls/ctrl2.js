const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.use('/ctrl2', router);
};

router.all('/page2', (req, res) => {
   res.render('ctrl2/page2')
})

