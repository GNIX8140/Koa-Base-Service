// 服务配置
const Config = require('../config/config');
// Koa 中间件
const Koa = require("koa");
const app = new Koa();
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const KoaSession = require('koa-session');
const IndexRouter = require("../router/index");
const KoaPassport = require('../middleware/passport');
const ResponseTime = require("../middleware/responseTime");
const responseError = require("../middleware/responseError");
const ResponseModel = require("../middleware/responseModel");
const Authorization = require("../middleware/authorization");
// 初始化 Koa
app.keys = Config.Koa.Keys;
app
    .use(ResponseTime) // 响应时间
    .use(ResponseModel) // 响应消息体模型
    .use(responseError) // 响应错误处理
    .use(KoaBody(Config.Koa.KoaBody)) // Koa请求体
    .use(KoaCors(Config.Koa.KoaCors)) // Koa跨域
    .use(KoaSession(Config.Koa.KoaSession, app)) // Koa Session
    .use(KoaStatic(Config.Koa.KoaStatic[0])) // Koa静态资源
    .use(KoaPassport.initialize()) // Passport 初始化
    .use(KoaPassport.session()) // Passport Session配置
    .use(Authorization) // 请求拦截
    .use(IndexRouter.routes()) // Koa路由
    .use(IndexRouter.allowedMethods()) // Koa 路由处理

module.exports = app;