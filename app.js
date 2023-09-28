"use strict"
// 服务配置
const Config = require('./src/config/config');
// 基础组件
require("pretty-error").start();
const http = require('http');
const https = require("https");
const server_ip = require('./src/utils/ip')();
const InitService = require('./src/utils/init');
const Koa = require('./src/basic/koa');
const WS = require('ws');
const WSService = require('./src/basic/ws');
// 启动服务
InitService()
    .then(() => { // 启动 HTTP 服务
        return new Promise((resolve, reject) => {
            const HttpServer = http.createServer(Koa.callback());
            HttpServer.listen(Config.Port.http, err => {
                if (err) return reject(err);
                console.log(`HTTP Service run at http://${server_ip}${Config.Port.http === 80 ? '' : `:${Config.Port.http}`}`);
                return resolve(HttpServer);
            });
        });
    })
    .then(HttpServer => {
        if (!Config.WebSocket.enable) return;
        const WSApp = new WS.Server({ server: HttpServer });
        WSService(WSApp);
        return;
    })
    .then(() => { // 启动 HTTPS 服务
        if (!Config.SSL.enable) return;
        return new Promise((resolve, reject) => {
            const HttpsServer = https.createServer(require('./src/utils/ssl')(), Koa.callback());
            HttpsServer.listen(Config.Port.https, err => {
                if (err) return reject(err)
                console.log(`HTTPS Service run at https://${server_ip}${Config.Port.http === 80 ? '' : `:${Config.Port.https}`}`);
                return resolve();
            });
        });
    })
    .then(() => {
        console.log('Service Start Success');
    })
    .catch(err => { // 错误处理
        console.error(err);
        process.exit(1);
    });