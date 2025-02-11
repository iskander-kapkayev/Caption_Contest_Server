import express from "express";
import pg from "pg";
import cors  from "cors";

const app = express();
const port = 3000;

const { Pool } = pg

const pool = new Pool({
    user: 'postgres.yzktumgeariddxkxyydp',
    host: 'aws-0-us-east-1.pooler.supabase.com',
    database: 'postgres',
    password: 'V21Z4YH0iARwVAoM',
    port: 6543,
    idleTimeoutMillis: 300
});

const corsOptions ={
   origin: '*', 
   credentials: true, //access-control-allow-credentials:true
   optionSuccessStatus: 200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

// this function will query and get all the images available
async function graballimages() {

    const dbclient = await pool.connect();

    try {
        dbclient.query('BEGIN')

        let imageURLs = [];
        let query = 'SELECT imageurl FROM images';
        let result = await dbclient.query(query);

        for(let i = 0; i < result.rows.length; i++) {
            imageURLs.push(result.rows[i].imageurl);
        }

        return imageURLs;

    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        await dbclient.release();
    }
}

// function to check if user exists for sign up
async function checkifexists(username, email) {
    // query to check if a user exists

    const dbclient = await pool.connect();

    try {
        await dbclient.query('BEGIN')

        let query = 'SELECT email FROM users WHERE email = $1';
        let result = await dbclient.query(query, [email]);

        if (result.rows.length === 0) { //meaning unique email address
            query = 'SELECT username FROM users WHERE username = $1';
            result = await dbclient.query(query, [username]);
            if (result.rows.length === 0) { //meaning unique username
                return true;
            }
        }
        return false;
    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        dbclient.release();
    }
}

// function to insert new user into db
async function insertnewuser(username, password, email) {

    const dbclient = await pool.connect();

    try {
        await dbclient.query('BEGIN')

        const now = new Date(); // set and convert timestamp
        const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

        let query = 'INSERT INTO users (username, password, email, registeredat, lastlogin) VALUES ($1, $2, $3, $4, $5)';
        await dbclient.query(query, [username, password, email, timestamp, timestamp]);
        await dbclient.query('COMMIT')
        return true;
    }
    catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        dbclient.release()
    }

}

// function to check if user exists for sign up
async function signin(email, password) {
    // query to check if a user exists

    const dbclient = await pool.connect();

    try {
        await dbclient.query('BEGIN')

        let query = 'SELECT password FROM users WHERE email = $1';
        let result = await dbclient.query(query, [email]);

        return (result.rows[i].password === password);

    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        dbclient.release();
    }
}

// this function will query and get all the images available
async function collectcaptions(imageID) {

    const dbclient = await pool.connect();

    try {
        dbclient.query('BEGIN')

        let captions = [];
        let query = 'SELECT captiontext, userid, upvotes FROM captions WHERE imageid = $1';
        let result = await dbclient.query(query, [imageid]);

        for(let i = 0; i < result.rows.length; i++) {
            captions.push(result.rows);
        }

        return imageURLs;

    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        await dbclient.release();
    }
}

// this get request will provide the imageURLs from the database!
app.get('/graballimages', async (req, res) => {
    let imageURLs = await graballimages();
    res.send(imageURLs);
});

// this get request will check if a user exists
app.get('/checkifexists', async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    (await checkifexists(username, email)) ? res.send(true): res.send(false) ;
});

// this post request will set a new user into the database
app.post('/insertnewuser', async (req, res) => {
    const username = req.query.username;
    const email = req.query.email;
    const password = req.query.password;
    (await insertnewuser(username, email, password)) ? res.send(true): res.send(false) ;
});

// this get request will check and log in a user
app.get('/signin', async (req, res) => {
    const email = req.query.email;
    const password = req.query.password;
    (await signin(email, password)) ? res.send(true): res.send(false) ;
});

// this get request will grab captions
app.get('/collectcaptions', async (req, res) => {
    let captions = await collectcaptions();
    res.send(captions);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

