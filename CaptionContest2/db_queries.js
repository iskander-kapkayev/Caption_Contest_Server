
// this will work with database connection
import * as db from './db_conn.js' ;

/*
// query to grab all image string names
const imageurls = []; // this will house it
let query = 'SELECT imageurl FROM images';
let result = await db.pool.query(query);

for(let i = 0; i < result.rows.length; i++) {
    imageurls.push(result.rows[i].imageurl);
}
*/

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
                return 1;
            }
        }
        return 0;
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
    if (checkifexists(username, email) === 1) {
        const dbclient = await db.pool.connect();

        try {
            await dbclient.query('BEGIN')

            let query = 'SELECT max(userid) FROM users AS maxuser'; // find new userid
            let result = await dbclient.query(query);
            let counter = result.rows[0].max;
            counter++; // create new userid

            const now = new Date(); // set and convert timestamp
            const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');

            query = 'INSERT INTO users (userid, username, password, email, registeredat, lastlogin) VALUES ($1, $2, $3, $4, $5, $6)';
            await dbclient.query(query, [counter, username, password, email, timestamp, timestamp]);
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

insertnewuser('bunnykx','heheahah123','k.chen1004@gmail.com');
insertnewuser('aycaramba2','heheahah1233','k.chen1008@gmail.com');
