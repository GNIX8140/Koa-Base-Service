if (!require('../config/config').Databases.Enable.MongoDB) return;
const Config = require('../config/config').Databases.MongoDB;
const mongodb = require('mongoose');
mongodb.connect(`mongodb://${Config.host}:${Config.port}/${Config.database}`, Config.options);
module.exports = mongodb;