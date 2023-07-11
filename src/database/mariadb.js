const MySQL = require('../config/config').Databases.MySQL;
const Enable = require('../config/config').Databases.Enable;
const { Sequelize, ENUM } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('transaction');
Sequelize.useCLS(namespace);
if (Enable) {
    const mariadb = new Sequelize(MySQL.database, MySQL.username, MySQL.password, {
        dialect: MySQL.dialect,
        host: MySQL.host,
        port: MySQL.port,
        timezone: MySQL.timezone,
        pool: MySQL.pool,
        logging: MySQL.logging,
    });
    module.exports = mariadb;
}