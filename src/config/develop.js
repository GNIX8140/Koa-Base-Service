module.exports = {
    Port: {
        http: 80,
        https: 443,
    },
    Koa: {
        KoaBody: {
            multipart: true,
            formidable: {
                maxFileSize: 20 * 1024 * 1024,
            }
        },
        KoaCors: {
            host: '*',
        }
    },
    SSL: {
        key: '/Users/xingwenhao/Code/SSL/cert.key',
        cert: '/Users/xingwenhao/Code/SSL/cert.pem',
    },
    Public: {
        path: '/Users/xingwenhao/public',
    },
    Databases: {
        MySQL: {
            dialect: 'mariadb',
            host: 'localhost',
            port: 3306,
            database: 'localserver',
            username: 'root',
            password: 'root',
            timezone: '+08:00',
            pool: {
                max: 5,
                min: 0,
                qcquire: 30000,
                idle: 10000,
            },
            logging: false,
        },
        Redis: {
            port: 6379,
            host: 'localhost',
            database: 1,
        },
        MongoDB: {
            host: 'localhost',
            port: 27017,
            database: 'localserver',
            authSource: 'admin',
            username: 'root',
            password: 'root',
        },
        Memcached: {
            host: 'localhost',
            port: 11211,
            debug: false,
            retries: 5,
        }
    },
}