const Enable = require('../config/config').Databases.Enable;
const WaitTime = 1000 * 0.1;
// MariaDB连接测试
function MariaDBConnentTest() {
    return new Promise(resolve => {
        const mariadb = require('../database/mariadb');
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
    const redis = require('../database/redis');
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve(redis.isReady);
        }, WaitTime);
    });
}
// MongoDB连接测试
function MongoDBConnectTest() {
    const mongodb = require('../database/mongodb');
    return new Promise(resolve => {
        setTimeout(() => {
            return resolve(mongodb.connection.readyState === 1);
        }, WaitTime);
    });
}
// Memcached连接测试
function MemcachedConnectTest() {
    const memcached = require('../database/memcached');
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
            if (Enable) {
                if (!await MariaDBConnentTest()) throw 'MariaDB 连接错误';
                if (!await RedisConnectTest()) throw 'Redis 连接错误';
                if (!await MongoDBConnectTest()) throw 'MongoDB 连接错误';
                if (!await MemcachedConnectTest()) throw 'Memcached 连接错误';
            }
            return resolve(true);
        } catch (err) {
            return reject(err);
        }
    });
}
module.exports = InitServe;