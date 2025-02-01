// this will work with the database connection script file
import * as dbq from './db_queries.js';

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