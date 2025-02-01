
// import for running image query
import * as dbq from './db_queries.js';

// create a way to cycle through the caption contest images
let currentIndex = 0;
let imageurls = await dbq.graballimages(); // this is now an array of image sources

function showImage() {
    document.getElementById("image").src = images[nextIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageurls.length;
    showImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageurls.length) % imageurls.length;
    showImage();
}

// initialize the image cycle by showing the first image
showImage(currentIndex);
