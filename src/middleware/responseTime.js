const moment = require('moment');
module.exports = async (ctx, next) => {
    let startTime = new Date().getTime();
    await next();
    let endTime = new Date().getTime();
    console.log(`| Request Time: ${moment().format('YYYY-MM-DD HH:mm:ss')} | Request Method: ${ctx.request.method} | Response Time: ${endTime - startTime}ms | Route Path: ${ctx.path} |`);
}