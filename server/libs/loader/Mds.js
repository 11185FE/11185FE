const Unit = require('../Unit');
const { mdsUrl } = require('../../config/');
const targz = require('tar.gz');
const superagent = require('superagent');

class MdsLoader extends Unit {
  constructor() {
    super();
    this.getMdsInfo = this.getMdsInfo.bind(this);
  }

  getMdsInfo() {
    return new Promise((resolve, reject) => {
      const url = "https://api.github.com/repos/11185FE/mds/tarball/master";
      const read = superagent.get(url);
      const parse = targz().createParseStream();
      const mdsInfo = {};
      parse.on('entry', entry => {
        if (entry.type == 'File') {
          const pathArr = entry.path.split('/');
          const tag = pathArr[1];
          const path = entry.path.replace(pathArr[0], '');
          const name = pathArr[pathArr.length - 1].replace('.md', '');
          if(!mdsInfo.hasOwnProperty(path)) {
            mdsInfo[path] = {
              tag,
              path,
              name,
              mds: '',
            };
          }
          entry.on('data', data => {
            mdsInfo[path].mds += data.toString();
          })
        }
      });
      parse.on('error', e => {
        reject(e);
      })
      parse.on('end', () =>{
        resolve(mdsInfo);
      });
      read.pipe(parse);
    })
  }
}

module.exports = new MdsLoader();
