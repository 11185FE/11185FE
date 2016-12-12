const Unit = require('../Unit');
const { mdsUrl } = require('../../config/');

class MdsLoader extends Unit {
  constructor() {
    super();
    this._getMdsInfo = this._getMdsInfo.bind(this);
    this.result = {
      directories: [],
      mdsInfo: {}
    };
    this._init();
  }

  _init() {
    this._getDirectory();
    return this;
  }

  async _getDirectory() {
    const {fetchBody, result, _getMdsInfo } = this;
    const $ = await fetchBody(mdsUrl, {}, true);
    const $directories = $('table.files tr.js-navigation-item');

    let i = 0;
    while(i < $directories.length) {
      const $ele = $directories.eq(i);
      const id = i;
      const title = $ele.find('a').text();
      const link = 'https://github.com/' + $ele.find('a').attr('href');
      result.directories.push({
        id,
        link,
        title,
      });
      result.mdsInfo[`directory-${i}`] = [];
      await _getMdsInfo(i);
      i++;
    }
  }

  _getMdsInfo(index) {
    const { fetchBody, result } = this;
    const { id, title, link } = result.directories[index];
    return fetchBody(link, {}, true).then(async function($){
      const $mds = $('table.files tr.js-navigation-item');

      let i = 1;
      while(i < $mds.length) {
        const $ele = $mds.eq(i);
        const id = `${index}-${i}`;
        const title = $ele.find('a').text().replace(/.md/i,'');
        const link = `https://github.com/${$ele.find('a').attr('href')}`;
        const $ = await fetchBody(link, {}, true);
        const mdsHtmlStr = $('article.markdown-body').text();
        result.mdsInfo[`directory-${index}`].push({
          id,
          link,
          title,
          html: mdsHtmlStr,
        });
        console.log(i);
        i++;
      }
      return 1;
    })
  }
}

new MdsLoader();
module.exports = MdsLoader;
