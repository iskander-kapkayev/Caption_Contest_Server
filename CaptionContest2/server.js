// this does not have pw protections
// this will connect to the db and allow other files to access it
const { Pool } = require("pg");
const pool = new Pool({
    user: 'postgres.yzktumgeariddxkxyydp',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    database: 'postgres',
    password: 'V21Z4YH0iARwVAoM',
    port: 6543,
    idleTimeoutMillis: 300
});

module.exports = pool;

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

// this will work with database connection

let imageRaw = pool.query('SELECT imageurl FROM images', (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            results.status(500).send('Internal Server Error');
            return;
        }
        return results.rows;
    });

let imageCycler = [];
for (let i = 0; i < imageRaw.length; i++) {
    imageCycler[i] = imageRaw[i].imageurl;
}

console.log(imageCycler);



