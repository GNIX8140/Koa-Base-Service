const Authorization = require('../config/config').Authorization;
const AllowURL = Authorization.allowURL;
module.exports = async (ctx, next) => {
    let url = ctx.originalUrl;
    if (url.indexOf('?') !== -1) url = url.split('?')[0];
    if (AllowURL.indexOf(url) === -1) {
        // TODO API权限验证策略
        return ctx.unauthorized();
    }
    await next();
}