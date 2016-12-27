const fetch = require('node-fetch');
const cheerio = require('cheerio');
// const fs = require('fs-extra');

class Unit {
  constructor() {
    this.fetchData = this.fetchData.bind(this);
    this.fetchBody = this.fetchBody.bind(this);
    this.fetchJsonData = this.fetchBody.bind(this);
    this.getBufferData = this.fetchBody.bind(this);
  }

  /**
   * 请求url数据
   */
  fetchData(url, option) {
    return fetch(url, option)
      .catch(err => {
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
    const { fetchData } = this;
    return fetchData(url, option)
      .then(res => res.text())
      .then(body => {
        return jQuery
          ? cheerio.load(body)
          : body;
      });
  }

  /**
   * get请求获取JSON数据
   * @param  {String}  url  请求地址
   * @return {Promise}
   */
  fetchJsonData(url) {
    const { fetchData } = this;
    return fetchData(url)
      .then(res => res.json());
  }

  /**
   * get请求获取文件信息
   * @param  {String}  url  请求地址
   * @return {Promise}
   */
  getBufferData(url) {
    const { fetchData } = this;
    return fetchData(url)
      .then(res => res.buffer());
  }


  getResult() {
    return this.result;
  }
}

module.exports = Unit;
