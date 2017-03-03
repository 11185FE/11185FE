const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const mongoose = require('mongoose');
const MarkdownIt = require('markdown-it');
const { MdsLoder } = require('../libs/loader');
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
    if (data.status === 1) {
        console.log('Mds loaded');
        res.send('Mds loaded');
    } else {
        console.log(`Mds load error: ${data.msg}`);
        res.send(`Mds load error: ${data.msg}`);
    }
});

router.get('/:name', async (req, res) => {
    const name = req.params.name;
    const blog = await Blog.findOne({ name });
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
        tags: { '$in': [tag] },
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
            const mdsInfo = await MdsLoder.getMdsInfo();
            let status = 1,
                msg = 'Success';
            for (let key in mdsInfo) {
                if (mdsInfo.hasOwnProperty(key)) {
                    const mdInfo = mdsInfo[key];
                    const { tags, source } = parseSourceContent(mdInfo.mds);
                    await Blog.update({
                        path: mdInfo.path
                    }, {
                            tags,
                            source,
                            name: mdInfo.name,
                            path: mdInfo.path,
                        }, { upsert: true }, err => {
                            if (err) {
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
function parseSourceContent(data) {
    let info = {
        tags: '',
    };
    const tagReg = /(tags)(.)*/;
    let tagStr = data.match(tagReg); // 获取标签数据
    if (tagStr) {
        tagStr = tagStr[0];
        let i = tagStr.indexOf(':');
        if (i !== -1) {
            const name = tagStr.slice(0, i).trim();
            const value = tagStr.slice(i + 1).replace(/(^\s*)|(\s*$)/g, '');
            info[name] = value;
        }
    }
    info.tags = info.tags.split(',');
    if (info.tags.length) {
        let i = 0;
        let link = 'tags: ';
        while (i < info.tags.length) {
            link += `[${info.tags[i]}](/blog/tag/${info.tags[i]}) `;
            i++;
        }
        data = data.replace(tagReg, link + '\n');
    }
    info.source = data;
    return info;
}
