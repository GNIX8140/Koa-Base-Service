const moment = require('moment');
function FormatLog(date, method, time, path) {
    method = method.padStart(8, " ");
    time = time.toString().padStart(6, " ");
    return `| Request Time: ${date} | Request Method: ${method} | Response Time: ${time}ms | Route Path: ${path} |`;
}
module.exports = async (ctx, next) => {
    const startTime = new Date().getTime();
    await next();
    const endTime = new Date().getTime();
    ctx.body.process_time = `${endTime - startTime}ms`;
    console.log(FormatLog(moment(startTime).format('YYYY-MM-DD HH:mm:ss'), ctx.request.method, endTime - startTime, ctx.path));
}