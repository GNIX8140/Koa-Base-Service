const redis = require('../database/redis');
const mariadb = require('../database/mariadb');
const mongodb = require('../database/mongodb');
const memcached = require('../database/memcached');
const WaitTime = 1000 * 0.1;
// MariaDB连接测试
function MariaDBConnentTest() {
    return new Promise(resolve => {
        setTimeout(async () => {
            try {
                await mariadb.authenticate();
                return resolve(true);
            } catch (err) {
                return resolve(false);
            }
        }, WaitTime);
    });
}
// Redis连接测试
function RedisConnectTest() {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve(redis.isReady);
        }, WaitTime);
    });
}
// MongoDB连接测试
function MongoDBConnectTest() {
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve(mongodb.connection.readyState === 1);
        }, WaitTime);
    });
}
// Memcached连接测试
function MemcachedConnectTest() {
    return new Promise(resolve => {
        setTimeout(() => {
            memcached.stats((err, stats) => {
                if (err) return resolve(false);
                return resolve(true);
            });
        }, WaitTime);
    });
}
// 测试启动服务
function InitServe() {
    return new Promise(async (resolve, reject) => {
        try {
            if (!await MariaDBConnentTest()) throw 'MariaDB 连接错误';
            if (!await RedisConnectTest()) throw 'Redis 连接错误';
            if (!await MongoDBConnectTest()) throw 'MongoDB 连接错误';
            if (!await MemcachedConnectTest()) throw 'Memcached 连接错误';
            return resolve(true);
        } catch (err) {
            return reject(err);
        }
    });
}
module.exports = InitServe;