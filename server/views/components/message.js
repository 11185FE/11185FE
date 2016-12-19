const Vue = require('vue');
const fs = require('fs');
const path = require('path')
var template=fs.readFileSync(path.resolve(__dirname,'message.html'),'utf-8');

Vue.component('message', {
    template,
    props: ['message']
})





