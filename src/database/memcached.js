const Config = require('../config/config').Databases.Memcached;
const Memcached = require('memcached');
const memcached = new Memcached(`${Config.host}:${Config.port}`, {
    debug: Config.debug,
    retries: Config.retries,
});
module.exports = memcached;