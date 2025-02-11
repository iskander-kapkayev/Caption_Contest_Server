
/*
Async function call to fetch http request
*/

async function fetchDBData (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}

/*
This section is for image handling.
Will http request into localhost to retrieve URLs from database.
Then, function to cycle indices will move between images.

*/

// create a way to cycle through the caption contest images (let's add more anime images!)
let currentIndex = 0;

async function moveToImage() {
    let URL = 'https://caption-contest-server.vercel.app/graballimages';
    let imageURLs = await fetchDBData(URL); // this will fetch data from http request to grab all images
    let img = document.getElementById("myImage");
    currentIndex = (currentIndex + 1) % imageURLs.length;
    img.src = imageURLs[currentIndex];
    img.alt = `index ${currentIndex}`;
}

// create a way to sign up as a new user

async function signUpCheck(username, email) {
    let URL = `https://caption-contest-server.vercel.app/checkifexists?username=${username}&email=${email}`;
    let signUpCheck = await fetchDBData(URL); // this will fetch a success or error for signing up
    (signUpCheck) ? true:false;
}

async function signUpRegister(username, email, password) {

    // first check that you can sign up
    const uniqueUser = await signUpCheck(username, email);

    if (uniqueUser) {
        let URL = `https://caption-contest-server.vercel.app/insertnewuser?username=${username}&email=${email}&password=${password}`;
        let signUpCheck = await fetchDBData(URL); // this will fetch a success or error for signing up
        (signUpCheck) ? true:false;
    } else {
        // if you can't sign up, then abort and alert console
        console.log('This username or email is already in use and thus cant be used');
        return false;
    }
}

// create a way to sign in as a regular user

async function signInUser(email, password) {
    let URL = `https://caption-contest-server.vercel.app/signin?email=${email}&password=${password}`;
    let signInCheck = await fetchDBData(URL); // this will fetch a success or error for signing up
    (signInCheck) ? true:false;
}


// placeholder for comments at the moment
function addComment() {
    const commentInput = document.getElementById('commentInput');
    const comments = document.getElementById('comments');

    if (commentInput.value.trim() !== "") {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.textContent = commentInput.value;
        comments.appendChild(comment);
        commentInput.value = ""; // Clear the input
    } else {
        alert('Please enter a comment before submitting.');
    }
}

// scripts for signing in and registering
function showRegisterForm() {
      document.querySelector('.form-container').style.display = 'none'; // Hide Sign In Form
      document.getElementById('registerForm').style.display = 'block'; // Show Register Form
    }
function showSignInForm() {
      document.querySelector('.form-container').style.display = 'block'; // Show Sign In Form
      document.getElementById('registerForm').style.display = 'none'; // Hide Register Form
    }
