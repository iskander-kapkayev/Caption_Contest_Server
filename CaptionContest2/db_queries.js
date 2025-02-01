
// this will work with the database connection script file
import * as db from './db_conn.js';


// this function will query and get all the images available
export async function graballimages() {

    const dbclient = await db.pool.connect();

    try {
        await dbclient.query('BEGIN')

        let imageurls = [];
        let query = 'SELECT imageurl FROM images';
        let result = await db.pool.query(query);

        for(let i = 0; i < result.rows.length; i++) {
            imageurls.push(result.rows[i].imageurl);
        }
        console.log(imageurls);
        return imageurls;

    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        dbclient.release();
    }
}


// function to check if user exists for sign up
async function checkifexists(username, email) {
    // query to check if a user exists

    const dbclient = await db.pool.connect();

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


// function to run insert new user
async function insertnewuser(username, password, email) {
    // query to check if a user exists
    if (await checkifexists(username, email)) {
        const dbclient = await db.pool.connect();

        try {
            await dbclient.query('BEGIN')

            const now = new Date(); // set and convert timestamp
            const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

            let query = 'INSERT INTO users (username, password, email, registeredat, lastlogin) VALUES ($1, $2, $3, $4, $5)';
            await dbclient.query(query, [username, password, email, timestamp, timestamp]);
            await dbclient.query('COMMIT')
        }
        catch (e) {
            await dbclient.query('ROLLBACK')
            throw e
        } finally {
            dbclient.release()
        }
    } else {
        console.log('Either the username or email address already exists.')
    }
}


// function to check if user exists for sign up
async function signin(email, password) {
    // query to check if a user exists

    const dbclient = await db.pool.connect();

    try {
        await dbclient.query('BEGIN')

        let query = 'SELECT password FROM users WHERE email = $1';
        let result = await dbclient.query(query, [email]);

        if (result.rows[i].password === password) {
            // activate sign in!
            return true;
        } else {
            // password did not match
            return false;
        }

    } catch (e) {
        await dbclient.query('ROLLBACK')
        throw e
    } finally {
        dbclient.release();
    }
}

export default function() {
    console.log('This is the default export.');
}