const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
    app.use('/api/test', router);
};

router.all('/', (req, res) => {
   res.send({a:233})
})