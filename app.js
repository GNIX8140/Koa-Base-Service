"use strict"
// 服务配置
const Config = require('./src/config/config');
// 基础组件
const http = require('http');
const https = require("https");
require("pretty-error").start();
const ssl = require('./src/utils/ssl')();
const server_ip = require('./src/utils/ip')();
const InitServe = require('./src/utils/init');
// Koa 中间件
const Koa = require("koa");
const app = new Koa();
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const KoaSession = require('koa-session');
const IndexRouter = require("./src/router/index");
const KoaPassport = require('./src/middleware/passport');
const ResponseTime = require("./src/middleware/responseTime");
const responseError = require("./src/middleware/responseError");
const ResponseModel = require("./src/middleware/responseModel");
const Authorization = require("./src/middleware/authorization");
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
// 启动服务
InitServe()
    .then(() => { // 启动 HTTP 服务
        return new Promise((resolve, reject) => {
            // 启动服务
            http.createServer(app.callback()).listen(Config.Port.http, err => {
                if (err) return reject(err);
                return resolve();
            });
        });
    })
    .then(() => { // 启动 HTTPS 服务
        return new Promise((resolve, reject) => {
            https.createServer(ssl, app.callback()).listen(Config.Port.https, err => {
                if (err) return reject(err)
                return resolve();
            });
        });
    })
    .then(() => {
        console.log(`HTTP Service run at http://${server_ip}/\nHTTPS Service run at https://${server_ip}/`);
        console.log('Service Start Success');
    })
    .catch(err => { // 错误处理
        console.error(err);
        process.exit(1);
    });