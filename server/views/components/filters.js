const Vue = require('vue');
Vue.filter('date', function (value, format) {

    var fmt = format;
    var obj = null;
    if (typeof value == "string") {
        obj = new Date(parseInt(value) * 1000);
    }
    else if (typeof value == "number") {
        obj = new Date(value * 1000);
    }
    else {
        obj = value
    }
    var o = {
        "M+": obj.getMonth() + 1, //月份 
        "d+": obj.getDate(), //日 
        "h+": obj.getHours(), //小时 
        "m+": obj.getMinutes(), //分 
        "s+": obj.getSeconds(), //秒 
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度 
        "S": obj.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

    return fmt;
});

Vue.filter('prefixnum', function (num, n) {
    n = n || 8;
    return (Array(n).join(0) + num).slice(-n);
})
Vue.filter('num2cn', function (num) {
    var result = "零 一 二 三 四 五 六 七 八 九 十".split(" ")[parseInt(num)];
    return result || num;
})