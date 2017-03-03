const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const superagent = require('superagent')
const targz = require('tar.gz')
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
    res.render('job/list', {
        data: {
            jobs: projects
        }
    })
})

router.all('/week', (req, res) => {
    var weekProjects = [];
    var now = new Date();
    var startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1);
    var toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 8);
    for (let i in projects) {
        if (projects[i].editDate >= startDate && projects[i].editDate < toDate) {
            weekProjects.push(projects[i])
        }
    }

    weekProjects.forEach(project => {
        project.logs = project.logs  && project.logs.filter(log=>{
            return log.date>=startDate&&log.date<toDate;
        })

        project.logs.forEach(log=>{
            log.text= md.render(log.text)
        })
        
    })

    res.render('job/week', {
        data: {
            jobs: weekProjects
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
    projects.sort(function (a, b) {
        return b.editDate - a.editDate;
    })
}
