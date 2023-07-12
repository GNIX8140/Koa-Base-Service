if (!require('../config/config').Databases.Enable.Memcached) return;
const Config = require('../config/config').Databases.Memcached;
const Memcached = require('memcached');
const memcached = new Memcached(`${Config.host}:${Config.port}`, Config.options);
module.exports = memcached;