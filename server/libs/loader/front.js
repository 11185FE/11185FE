const { frontUrl } = require('../../config/');
const targz = require('tar.gz');
const superagent = require('superagent');

class FrontLoader {
  constructor() {
  }

  getInfo() {
    return new Promise((resolve, reject) => {
      const url = frontUrl;
      const read = superagent.get(url);
      const parse = targz().createParseStream();
      const projects = [];
      parse.on('entry', entry => {
        if (entry.type == 'File' && /readme/i.test(entry.path)) {
          var readme = "";
          entry.on('data', data => {
            readme += data.toString();

          })
          entry.on('end', () => {
            var title = readme.match(/^#(.*)\n/);
            title = title && title[1].trim();
            var editDate = readme.match(/修改日期[:：]([\d- ]*)\n/);
            editDate = editDate && new Date(editDate[1].trim());
            var progress = readme.match(/进度[:：](\d*)\% *\n/);
            progress = progress && parseInt(progress[1]) / 100;
            var teamers = readme.match(/参与人员[:：](.*) *\n/);
            teamers = teamers && teamers[1];
            var splitor = /\,/.test(teamers) ? "," : " "
            teamers = teamers && teamers.trim().split(splitor);
            var path = entry.path;

            var logText = readme.match(/修改记录([^#$]*)/);
            logText = logText && logText[1];
            
            var logs = [];
            if (logText) {
              var logTexts = logText.match(/- [\d-\/ ]*\n([\S\s](?!- \d))*/g);
              for (let l in logTexts) {
                var date = logTexts[l].match(/- ([\d-\/ ]*)/);
                date = date && new Date(date[1]);
                logs.push({ date, text: logTexts[l] })
              }
            }
            var project = { title, path, editDate, progress, teamers, readme, logText, logs };
            title && projects.push(project)
          })
        }
      });
      parse.on('error', e => {
        reject(e);
      })
      parse.on('end', () => {
        resolve(projects);
      });
      read.pipe(parse);
    })
  }


}

module.exports = new FrontLoader();
