const Router = require('koa-router');
const TestController = require('../controller/test');
module.exports = new Router({ prefix: '/test' })
    .get('/', TestController.Test)