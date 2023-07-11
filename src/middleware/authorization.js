const AllowURL = [
    '/',
]
module.exports = async (ctx, next) => {
    let url = ctx.originalUrl;
    if (url.indexOf('?')) url = url.split('?')[0];
    
    if (AllowURL.indexOf(url) === -1) {
        return ctx.unauthorized();
    }
    await next();
}