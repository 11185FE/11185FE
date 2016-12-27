const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const superagent = require('superagent')
const targz = require('tar.gz')
const Job = mongoose.model('Job');
const { FrontLoader } = require('../libs/Loader');
const MarkdownIt = require('markdown-it');

const md = new MarkdownIt({
    html: true,
    langPrefix: 'language-',
});
var projects = [];
module.exports = async (app) => {
    app.use('/job', router);
    await reload();
};

router.all('/', (req, res) => {
    res.redirect('list');
})

router.all('/list', async (req, res) => {

    projects.sort(function (a, b) {
        return a.editDate > b.editDate;

    })
    res.render('job/list', {
        data: {
            jobs: projects
        }
    })
})

router.all('/reload', async (req, res) => {
    await reload();
    res.send("success")

})



router.all('/:title', (req, res) => {
    const title = req.params.title;
    var project = null;
    for (let i in projects) {
        if (projects[i].title == title) {
            project = projects[i];
            break;
        }
    }
    res.render('job/job', {
        data: {
            job: project
        }
    })

})




var reload = async function () {
    projects = await FrontLoader.getInfo();
    for (let i in projects) {
        projects[i].readme = md.render(projects[i].readme);
    }
}