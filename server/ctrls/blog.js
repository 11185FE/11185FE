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
  const blogs = await Blog.find();
  res.render('blog/blogs', {
    data: {
      blogs,
      title: '博客列表',
    }
  });
});

router.all('/update', async (req, res) => {
  const result = await Blog.remove();
  const data = await setMdsInfo();
  if(data.status === 1) {
    console.log('Mds loaded');
    res.send('Mds loaded');
  }else {
    console.log(`Mds load error: ${data.msg}`);
    res.send(`Mds load error: ${data.msg}`);
  }
});

router.get('/:title', async (req, res) => {
  const title = req.params.title;
  const blog = await Blog.findOne({title});
  blog.source = md.render(blog.source);
  res.render('blog/blog', {
    data: {
      blog
    }
  });
});

router.get('/tag/:tag', async (req, res) => {
  const tag = req.params.tag;
  const blogs = await Blog.find({
    tags: {'$in': [tag]},
  });
  res.render('blog/blogs', {
    data: {
      blogs,
      title: tag,
    }
  });
});

// 存储博客内容
function setMdsInfo() {
  return new Promise(async (resolve, reject) => {
    try {
      const mdsInfo = await Mds.getMdsInfo();
      let status = 1,
          msg = 'Success';
      for( let key in mdsInfo) {
        if(mdsInfo.hasOwnProperty(key)) {
          const mdInfo = mdsInfo[key];
          const { title, date, tags, source } = parseSourceContent(mdInfo.mds);
          await Blog.update({
            path: mdInfo.path
          }, {
            date,
            tags,
            title,
            source,
            path: mdInfo.path,
          }, {upsert: true}, err => {
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

// 解析文章内容
function parseSourceContent (data){
  let info = {
    title:'',
    tags: '',
    date: new Date(),
  };
  const reg = /(^---\n)([^.])*(---\n)/;
  let str = data.match(reg); // 获取文本元数据
  if(str){
    data = data.replace(str[0],'').trim(); // 获取文本内容
    str = str[0].replace(/---\n/g, '').trim();
    str.split('\n').map( line => {
      let i = line.indexOf(':');
      if( i !== -1) {
        const name = line.slice(0, i).trim();
        const value = line.slice( i + 1).trim();
        info[name] = value;
      }
    });
  }
  info.tags = info.tags.replace(/\[|\]/g,'').split(',');
  info.source = data;
  return info;
}
