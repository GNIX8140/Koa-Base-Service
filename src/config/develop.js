module.exports = {
    Port: {
        http: 80,
        https: 443,
    },
    Koa: {
        Keys: ['koa-service'],
        KoaBody: {
            formidable: {
                maxFields: 1000,
                maxFileSize: 20 * 1024 * 1024,
                multipart: true,
            }
        },
        KoaCors: {
            origin: (ctx) => {
                return '*';
            },
            maxAge: 5,
            credentials: true,
            allowMethods: ['GET', 'POST'],
            allowHeaders: ['Content-Type', 'Authorization', 'Accept']
        },
        KoaStatic: [
            '/Users/xingwenhao/public',
        ],
        KoaSession: {
            key: 'koa-service',
            maxAge: 1000 * 60 * 60 * 24 * 7,
            overwrite: true,
            httpOnly: true,
            signed: true,
            rolling: true,
            renew: true,
            sameSite: 'none',
        },
    },
    SSL: {
        enable: false,
        key: '/Users/xingwenhao/Code/SSL/cert.key',
        cert: '/Users/xingwenhao/Code/SSL/cert.pem',
    },
    Authorization: {
        allowURL: [
            '/',
            '/test',
        ],
    },
    Databases: {
        Enable: {
            MySQL: false,
            Redis: false,
            MongoDB: false,
            Memcached: false,
        },
        MySQL: {
            database: 'localserver',
            username: 'root',
            password: 'root',
            options: {
                dialect: 'mariadb',
                host: 'localhost',
                port: 3306,
                timezone: '+08:00',
                pool: {
                    max: 5,
                    min: 0,
                    qcquire: 30000,
                    idle: 10000,
                },
                logging: false,
            }
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
            options: {
                authSource: 'admin',
                user: 'root',
                pass: 'root',
            }
        },
        Memcached: {
            host: 'localhost',
            port: 11211,
            options: {
                debug: false,
                failuresTimeout: 1000,
                retry: 1000,
                retries: 2,
                minTimeout: 1000,
                maxTimeout: 1000,
            }
        }
    },
}