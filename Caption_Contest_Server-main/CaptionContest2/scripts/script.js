
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

adjusted from localhost to vercel (which now hosts the server connection!)
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

/*
This section is for user handling.
Check if user exists then
Grab form data to sign in or register.
*/

// checks for a username/email that already exists
async function signUpCheck(username, email) {
    let URL = `https://caption-contest-server.vercel.app/checkifexists?username=${username}&email=${email}`;
    let signUpCheck = await fetchDBData(URL); // this will fetch a success or error for signing up
    (signUpCheck) ? true:false;
}

// registers a new user
async function signUpRegister(username, email, password) {
    
    // first check that you can sign up
    const uniqueUser = await signUpCheck(username, email);

    if (uniqueUser) {
        let URL = `https://caption-contest-server.vercel.app/register?username=${username}&email=${email}&password=${password}`;
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

    // set form item values
    /*
    const email = document.forms['login']['email'].value;
    const password = document.forms['login']['password'].value;
    */

    let URL = `https://caption-contest-server.vercel.app/signin?email=${email}&password=${password}`;
    let signInCheck = await fetchDBData(URL); // this will fetch a success or error for signing up
    (signInCheck) ? true:false;
}

// adding event listeners for user login and registration forms

if (window.location.href === "https://caption-contest-server-35n2.vercel.app/signup.html") {

    // set reg and login forms
    const regForm = document.getElementById('registerFormData');
    const loginForm = document.getElementById('loginFormData');

    console.log(document.getElementById('registerFormData'));
    console.log(document.getElementById('loginFormData'));

    // what to do on reg submit
    function forRegSubmit(event) {
        event.preventDefault(); // stops submit from redirection

        // access the desired input through the var we setup
        const username = regForm('usernameRegister').value;
        const email = regForm('emailRegister').value;
        const password = regForm('passwordRegister').value;


        // redirect user based on signup attempt
        if (signUpRegister(username, email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }

    // what to do on login submit
    function forLoginSubmit(event) {
        
        event.preventDefault(); // stops submit from redirection

        // access the desired input through the var we setup
        const email = loginForm('email').value;
        const password = loginForm('password').value;

        // redirect user based on signup attempt
        if (signInUser(email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }

    // event listeners below
    if (regForm) {
        regForm.addEventListener("submitReg", forRegSubmit);
    }
    if (loginForm) {
        loginForm.addEventListener("submitLogin", forLoginSubmit);
    }
} // only runs on the signup page script


// onclick buttons for login/sign up
/*
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("regButton").onclick = function() {

        // access the the username, email and pass
        const username = document.getElementById['usernameReg'].value;
        const email = document.getElementById['emailReg'].value;
        const password = document.getElementById['passwordReg'].value;

        // redirect user based on signup attempt
        if (signUpRegister(username, email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }

    document.getElementById("loginButton").onclick = function() {

        // access the email and pass
        const email = document.getElementById['email'].value;
        const password = document.getElementById['password'].value;
    
        // redirect user based on sign in attempt
        if (signInUser(email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }
});

*/

/*
This section is for comment switching.
It connects with the image handler.
*/

// this function will connect with DB and find appropriate db captions for current image
// currentIndex + 1 will represent the imageID we are handling
async function displayCaptions() {
    let URL = `https://caption-contest-server.vercel.app/collectcaptions?imageid=${currentIndex+1}`;
    let captions = await fetchDBData(URL); // this will fetch data from http request to grab all captions
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

/*
The functions below let the user switch 
between sign in and registration
*/

function showRegisterForm() {
      document.querySelector('.form-container').style.display = 'none'; // Hide Sign In Form
      document.getElementById('registerForm').style.display = 'block'; // Show Register Form
    }
function showSignInForm() {
      document.querySelector('.form-container').style.display = 'block'; // Show Sign In Form
      document.getElementById('registerForm').style.display = 'none'; // Hide Register Form
    }
