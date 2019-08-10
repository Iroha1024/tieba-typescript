//return 年-月-日 时:分:秒 2019-08-10 20:00:00
function getDatetime() {
    let time = '';
    let seperator = '-';
    let seperator2 = ':';
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();
    time = year + seperator + month + seperator + day + ' ' + hour + seperator2 + minute + seperator2 + second;
    return time;
}

module.exports = getDatetime;