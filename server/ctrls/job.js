const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');


var Job = mongoose.model('Job');


module.exports = (app) => {
    app.use('/job', router);
};


router.all('/list', async (req, res) => {

    var jobs = await Job.find({}).sort({ needDoneDate: -1 });


    var username = req.session.user ? req.session.user.username : "";
    res.render('job/list', {
        data: {
            username,
            jobs,

        }
    });
})


router.get('/add', async (req, res) => {
    // await Job.remove({})
    res.render('job/add', {
        data: {}
    })
});

router.post('/add', async (req, res) => {

    var job = new Job(req.body);
    await job.save();
    res.redirect("list");
});

router.all('/join', async (req, res) => {
    var id = req.query.id;
    var job = await Job.findById(id);
    job.teamers = job.teamers || [];
    if (job.teamers.includes(req.session.user.username)) {
        res.redirect("list");
        return;
    }

    job.teamers.push(req.session.user.username);
    await job.save();
    res.redirect("list");
})

router.all('/done', async (req, res) => {
    var id = req.query.id;
    var job = await Job.findById(id);
    job.doneDate = new Date();
    job.save();
    res.redirect("list");

})

router.get('/edit', async (req, res) => {
    var id = req.query.id;
    var job = await Job.findById(id);
    res.render('job/edit',{
        data:{
            job
        }
    })
})

router.post('/edit', async (req, res) => {
    var id = req.query.id;
    var job = await Job.findById(id);
    job.name=req.body.name;
    job.desc=req.body.desc;
    job.needDoneDate=req.body.needDoneDate;
    job.doneDate=null;
    await job.save();
    res.redirect("list");
});