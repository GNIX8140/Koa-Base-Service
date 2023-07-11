const Config = require('../config/config').Databases.Memcached;
const Enable = require('../config/config').Databases.Enable;
const Memcached = require('memcached');
if (Enable) {
    const memcached = new Memcached(`${Config.host}:${Config.port}`, {
        debug: Config.debug,
        retries: Config.retries,
    });
    module.exports = memcached;
}