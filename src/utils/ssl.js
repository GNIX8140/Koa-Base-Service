const fs = require('fs');
const Config = require('../config/config').SSL;
module.exports = () => {
    return {
        key: fs.readFileSync(Config.key),
        cert: fs.readFileSync(Config.cert),
    }
}