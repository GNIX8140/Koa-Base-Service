if (!require('../config/config').Databases.Enable.Redis) return;
const Config = require('../config/config').Databases.Redis;
const Redis = require('redis');
const redis = Redis.createClient(Config);
redis.on('error', err => console.log('Redis Client Error: ', err));
redis.connect();
module.exports = redis;