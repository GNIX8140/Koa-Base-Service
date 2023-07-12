"use strict"
// response数据格式模板
module.exports = async (ctx, next) => {
    // API接口请求成功
    ctx.success = (data) => {
        ctx.body = {
            status: 1,
            message: '服务请求成功',
            process_time: null,
            data: data || 'success'
        }
    }
    // API接口服务器内部错误
    ctx.error = (detail) => {
        ctx.body = {
            status: 1000,
            message: '服务内部错误',
            process_time: null,
            detail: detail || '服务内部错误',
        }
    }
    // API接口未授权
    ctx.unauthorized = (detail) => {
        ctx.body = {
            status: 1001,
            message: '请求未授权',
            process_time: null,
            detail: detail || '请求未授权',
        }
    }
    // API接口请求数据错误
    ctx.dataError = (detail) => {
        ctx.body = {
            status: 1002,
            message: '请求数据无效',
            process_time: null,
            detail: detail || '请求数据无效',
        }
    }
    await next();
}