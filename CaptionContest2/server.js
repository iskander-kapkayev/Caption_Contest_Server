
// server connection to postgres db

/*
* psql -h aws-0-us-west-1.pooler.supabase.com -p 6543 -d postgres -U postgres.ethomcuvxeqhrvycruhf
* hcTqgXvMv1YbXknn
* */

/*  //this is with pw protections
require ('dotenv').config();
const { Pool }  = require ('pg');

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_PASSWORD
} = process.env

export const Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
});
*/

// this does not have pw protections
const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres.ethomcuvxeqhrvycruhf',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    database: 'postgres',
    password: 'hcTqgXvMv1YbXknn',
    port: 6543,
    idleTimeoutMillis: 300
});
module.exports = pool;
pool.connect().then(()=>console.log('connected'));
pool.query('SELECT * FROM users', (err, res) => {
    if (!err) {
        console.log(res.rows);
    } else {
        console.log(err.message);
    }
    pool.end;
});
