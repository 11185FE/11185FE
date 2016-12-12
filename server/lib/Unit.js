const fetch = require('node-fetch');
const cheerio = require('cheerio');

class Unit {
  constructor() {
    this._fetchData = this._fetchData.bind(this);
    this.fetchBody = this.fetchBody.bind(this);
  }

  /**
   * 请求url数据
   */
  _fetchData(url, option) {
    return fetch(url, option).catch(err => {
      console.log('崩啦崩啦！！！！爬虫被打死啦！！！！');
    });
  }

  /**
   * 获取页面html结构
   * @param  {String}  url           请求地址
   * @param  {Object}  option        fetch配置
   * @param  {Boolean} [jQuery=true] 是否返回jq元素，默认true
   * @return {Promise}
   */
  fetchBody(url, option, jQuery = true) {
    const { _fetchData } = this;
    return _fetchData(url, option).then(res => {
      return res.text();
    }).then(body => {
      return jQuery
        ? cheerio.load(body)
        : body;
    });
  }

  getResult() {
    return this.result;
  }
}

module.exports = Unit;
