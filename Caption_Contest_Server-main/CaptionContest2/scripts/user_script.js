
/*
Async function call to fetch http request
*/

async function fetchDBData (url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
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
        console.log("This username or email is already in use and thus cant be used");
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
/*
// set reg and login forms
const regForm = document.getElementById['registerFormData'];
const loginForm = document.getElementById['login'];

// what to do on reg submit
function forRegSubmit(event) {
    event.preventDefault(); // stops submit from redirection

    // access the desired input through the var we setup
    const username = regForm['usernameRegister'].value;
    const email = regForm['emailRegister'].value;
    const password = regForm['passwordRegister'].value;


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
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    // redirect user based on signup attempt
    if (signInUser(email, password)) {
        window.location.href = "https://caption-contest-server-35n2.vercel.app/";
    } else {
        window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
    }
}

// event listeners below
regForm.addEventListener("submit", forRegSubmit);
loginForm.addEventListener("submit", forLoginSubmit);
*/

// onclick buttons for login/sign up

console.log(document.getElementById("regButton"));

document.addEventListener("DOMContentLoaded", function() {

    console.log("inside function");
    console.log(document.getElementById("regButton"));
    
    document.getElementById("regButton").onclick = function() {
        


        // access the the username, email and pass
        const username = document.getElementById("usernameReg").value;
        const email = document.getElementById("emailReg").value;
        const password = document.getElementById("passwordReg").value;

        // redirect user based on signup attempt
        if (signUpRegister(username, email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }

    document.getElementById("loginButton").onclick = function() {

        // access the email and pass
        const email = document.getElementById["email"].value;
        const password = document.getElementById["password"].value;
    
        // redirect user based on sign in attempt
        if (signInUser(email, password)) {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/";
        } else {
            window.location.href = "https://caption-contest-server-35n2.vercel.app/signup.html";
        }
    }
});

/*
The functions below let the user switch 
between sign in and registration
*/

function showRegisterForm() {
    document.querySelector(".form-container").style.display = "none"; // Hide Sign In Form
    document.getElementById("registerForm").style.display = "block"; // Show Register Form
  }
function showSignInForm() {
    document.querySelector(".form-container").style.display = "block"; // Show Sign In Form
    document.getElementById("registerForm").style.display = "none"; // Hide Register Form
  }
