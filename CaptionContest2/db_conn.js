// this does not have pw protections
// this will connect to the db and allow other files to access it
import pg from 'pg'
const { Pool } = pg

export const pool = new Pool({
    user: 'postgres.yzktumgeariddxkxyydp',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    database: 'postgres',
    password: 'V21Z4YH0iARwVAoM',
    port: 6543,
    idleTimeoutMillis: 300
});

export default function() {
    console.log('This is the default export.');
}

/*
pool.connect().then(()=>console.log('connected'));
pool.query('SELECT * FROM users', (err, results) => {
    if (!err) {
        console.log(results.rows);
    } else {
        console.log(err.message);
    }
});
*/


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