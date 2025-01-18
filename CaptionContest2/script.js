
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

// create a way to cycle through the caption contest images
let currentIndex = 0;
const images = document.querySelectorAll('.image-cycle');

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
}

// initialize the image cycle by showing the first image
showImage(currentIndex);

// scripts for signing in and registering
function showRegisterForm() {
      document.querySelector('.form-container').style.display = 'none'; // Hide Sign In Form
      document.getElementById('registerForm').style.display = 'block'; // Show Register Form
    }
function showSignInForm() {
      document.querySelector('.form-container').style.display = 'block'; // Show Sign In Form
      document.getElementById('registerForm').style.display = 'none'; // Hide Register Form
    }