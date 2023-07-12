const Router = require('koa-router');
module.exports = new Router()
    .get('/', ctx => {
        return ctx.success({
            path: ctx.path,
            method: 'GET',
        });
    })
    .post('/', ctx => {
        return ctx.success({
            path: ctx.path,
            method: 'POST',
        })
    })