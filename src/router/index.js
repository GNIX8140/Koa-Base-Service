const Router = require('koa-router');
const router = new Router()
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

module.exports = router;