const Enable = require('../config/config').Databases.Enable;
const Sync = require('../config/config').Databases.Sync;
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
// Sequelize 模型同步
async function SequelizeModelSyncAlert() {
    try {
        const sequelize = require('../database/mariadb');
        // TODO Model.sync({ alert: true });
        return true;
    } catch (err) {
        return false;
    }
}
// Sequelize 模型重建
async function SequelizeModelSyncForce() {
    try {
        const sequelize = require('../database/mariadb');
        await sequelize.query('SET foreign_key_checks = 0;');
        // TODO Model.sync({ force: true });
        await sequelize.query('SET foreign_key_checks = 1;');
        return true;
    } catch (err) {
        return false;
    }
}
// 测试启动服务
module.exports = () => {
    return new Promise(async (resolve, reject) => {
        try {
            if (Enable.MySQL && !await MariaDBConnentTest()) throw 'MariaDB 连接错误';
            if (Enable.Redis && !await RedisConnectTest()) throw 'Redis 连接错误';
            if (Enable.MongoDB && !await MongoDBConnectTest()) throw 'MongoDB 连接错误';
            if (Enable.Memcached && !await MemcachedConnectTest()) throw 'Memcached 连接错误';
            if (Sync.Sequelize.alert && !await SequelizeModelSyncAlert()) throw 'Sequelize 模型同步错误';
            if (Sync.Sequelize.force && !await SequelizeModelSyncForce()) throw 'Sequelize 模型重建错误';
            return resolve(true);
        } catch (err) {
            return reject(err);
        }
    });
}