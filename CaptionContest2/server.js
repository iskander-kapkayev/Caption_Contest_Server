
// server connection to postgres db

/*
* psql -h aws-0-us-west-1.pooler.supabase.com -p 6543 -d postgres -U postgres.ethomcuvxeqhrvycruhf
* hcTqgXvMv1YbXknn
* */

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