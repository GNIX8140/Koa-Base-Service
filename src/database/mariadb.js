if (!require('../config/config').Databases.Enable.MySQL) return;
const Config = require('../config/config').Databases.MySQL;
const { Sequelize } = require('sequelize');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('transaction');
Sequelize.useCLS(namespace);
const mariadb = new Sequelize(Config.database, Config.username, Config.password, Config.options);
module.exports = mariadb;