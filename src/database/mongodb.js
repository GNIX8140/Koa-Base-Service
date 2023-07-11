const MongoDB = require('../config/config').Databases.MongoDB;
const mongodb = require('mongoose');
mongodb.connect(`mongodb://${MongoDB.host}:${MongoDB.port}/${MongoDB.database}`, {
    authSource: MongoDB.authSource,
    user: MongoDB.username,
    pass: MongoDB.password,
});
module.exports = mongodb;