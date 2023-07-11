"use strict"
// 基础组件
const Config = require('./src/config/config');
const http = require('http');
const https = require("https");
const ssl = require('./src/utils/ssl')();
const server_ip = require('./src/utils/ip')();
const InitServe = require('./src/utils/init');
const prettyError = require("pretty-error").start();
// Koa
const Koa = require("koa");
const app = new Koa();
const KoaBody = require("koa-body");
const KoaCors = require("koa2-cors");
const KoaStatic = require('koa-static')
const IndexRouter = require("./src/router/index");
const ResponseTime = require("./src/middleware/responseTime");
const responseError = require("./src/middleware/responseError");
const ResponseModel = require("./src/middleware/responseModel");
const Authorization = require("./src/middleware/authorization");
// 初始化 Koa
app
    .use(ResponseTime)
    .use(ResponseModel)
    .use(responseError)
    .use(KoaBody(Config.Koa.KoaBody))
    .use(KoaCors({
        origin: function (ctx) {
            return Config.Koa.KoaCors.host;
        },
    }))
    .use(KoaStatic(Config.Public.path))
    .use(Authorization)
    .use(IndexRouter.routes())
    .use(IndexRouter.allowedMethods())
// 启动服务
InitServe()
    .then(() => {
        return new Promise((resolve, reject) => {
            // 启动服务
            http.createServer(app.callback()).listen(Config.Port.http, err => {
                if (err) return reject(err);
                return resolve();
            });
        });
    })
    .then(() => {
        return new Promise((resolve, reject) => {
            https.createServer(ssl, app.callback()).listen(Config.Port.https, err => {
                if (err) return reject(err)
                return resolve();
            });
        });
    })
    .then(() => {
        console.log(`Service run at http://${server_ip}/`);
        console.log(`Service run at https://${server_ip}/`);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    })