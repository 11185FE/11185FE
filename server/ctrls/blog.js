const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const MarkdownIt = require('markdown-it');
const { Mds } = require('../libs/Loader');
const Blog = mongoose.model('Blog');

const md = new MarkdownIt({
    html: true,
    langPrefix: 'language-',
});

module.exports = async (app) => {
  app.use('/blog', router);
};

router.get('/', async (req, res) => {
  const tags = await Blog.distinct('tag');
  res.render('blog/tags', {
    data: {
      tags,
    }
  });
});

router.all('/update', async (req, res) => {
  const data = await setMdsInfo();
  if(data.status === 1) {
    console.log('Mds loaded');
    res.send('Mds loaded');
  }else {
    console.log(`Mds load error: ${data.msg}`);
    res.send(`Mds load error: ${data.msg}`);
  }
});

router.get('/:tag/', async (req, res) => {
  const tag = req.params.tag;
  const mdsInfo = await Blog.find({tag});
  res.render('blog/blogs', {
    data: {
      tag,
      mdsInfo,
    }
  });
});

router.get('/:tag/:name', async (req, res) => {
  const tag = req.params.tag;
  const name = req.params.name;
  const mdInfo = await Blog.findOne({tag, name});
  mdInfo.mds = md.render(mdInfo.mds);
  res.render('blog/blog', {
    data: {
      mdInfo
    }
  });
});

function setMdsInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const mdsInfo = await Mds.getMdsInfo();
      let status = 1,
          msg = 'Success';
      for( let key in mdsInfo) {
        if(mdsInfo.hasOwnProperty(key)) {
          const mdInfo = mdsInfo[key];
          mdInfo.updateDate = new Date();
          await Blog.update({path: mdInfo.path}, mdInfo, {upsert: true}, err => {
            if(err) {
              msg = err;
              status = -1;
              return console.log(`${mdInfo.path} update error.`);
            }
          });
        }
      }
      resolve({
        status: status,
        msg: msg,
      });
    } catch (e) {
      resolve({
        status: -1,
        msg: e,
      });
    }
  });
};
