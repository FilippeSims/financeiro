const Pool = require('pg').Pool
const pool = new Pool({
    host: '172.20.0.3',
    user: 'postgres',
    database: 'financeiro',
    password: 'dashboard',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

exports.pool = pool