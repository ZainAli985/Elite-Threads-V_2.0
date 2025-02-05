// Image data
const textImages = ["./covertext.png", "./covertext2.png", "./covertext3.png", "./covertext4.png"];
const modelImages = ["./model1.png", "./model2.png", "./model3.png", "./model4.png"];

// DOM elements
const textImg = document.querySelector(".text img"); // Select img inside .text div
const modelImg = document.querySelector(".model-img img"); // Select img inside .model-img div

// Index to track current images
let currentIndex = 0;

// Function to update images
function updateBanner() {
    // Apply "slide-out" animations
    textImg.classList.remove("slide-in-left");
    textImg.classList.add("slide-out-left");

    modelImg.classList.remove("slide-in-right");
    modelImg.classList.add("slide-out-right");

    // Wait for slide-out animation to complete before updating the images
    setTimeout(() => {
        // Remove "slide-out" animations
        textImg.classList.remove("slide-out-left");
        modelImg.classList.remove("slide-out-right");

        // Update images
        currentIndex = (currentIndex + 1) % textImages.length;
        textImg.src = textImages[currentIndex];
        modelImg.src = modelImages[currentIndex];

        // Apply "slide-in" animations
        textImg.classList.add("slide-in-left");
        modelImg.classList.add("slide-in-right");
    }, 1000); // Match the duration of the slide-out animation
}

// Initial setup
textImg.src = textImages[currentIndex];
modelImg.src = modelImages[currentIndex];
textImg.classList.add("slide-in-left");
modelImg.classList.add("slide-in-right");

// Change images every 5 seconds
setInterval(updateBanner, 5000);
