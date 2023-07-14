const Router = require('koa-router');
const TestRouter = require('./test');
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
    .use(TestRouter.routes())