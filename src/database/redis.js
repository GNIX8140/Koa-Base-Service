const Config = require('../config/config').Databases.Redis;
const Enable = require('../config/config').Databases.Enable;
const Redis = require('redis');
if (Enable) {
    const redis = Redis.createClient({
        host: Config.host,
        port: Config.port,
        database: Config.database,
    });
    redis.on('error', err => console.log('Redis Client Error', err));
    redis.connect();

    module.exports = redis;
}