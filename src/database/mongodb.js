const MongoDB = require('../config/config').Databases.MongoDB;
const Enable = require('../config/config').Databases.Enable;
const mongodb = require('mongoose');
if (Enable) {
    mongodb.connect(`mongodb://${MongoDB.host}:${MongoDB.port}/${MongoDB.database}`, {
        authSource: MongoDB.authSource,
        user: MongoDB.username,
        pass: MongoDB.password,
    });
    module.exports = mongodb;
}