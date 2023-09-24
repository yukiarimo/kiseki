// Configuration for linear story parsing
const config = {
    delimiter: "\n", // Delimiter to split story into paragraphs
    paragraphTag: "p" // HTML tag to wrap paragraphs
};

// Display the parsed story
function displayStory(storyText) {
    storyText = localStorage.getItem("story")
    const storyContainer = document.getElementById("parsed-story");
    const paragraphs = storyText.split(config.delimiter);
    storyContainer.innerHTML = ""; // Clear previous content
    let currentIndex = 0;

    const displayNextParagraph = () => {
        if (currentIndex < paragraphs.length) {
            storyContainer.innerHTML = paragraphs[currentIndex];
            currentIndex++;
        } else {
            storyContainer.innerHTML = ""; // Clear the content when done
        }
    };

    storyContainer.addEventListener("click", displayNextParagraph);
}

// Function to create heart particles
function createHeartParticles(event) {
    const numParticles = 10;
    const particlesContainer = document.querySelector(".heart-particles");
    
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement("div");
        particle.classList.add("heart-particle");
        particle.style.left = (event.clientX - 7) + "px"; // Half width of particle
        particle.style.top = (event.clientY - 7) + "px"; // Half height of particle
        particlesContainer.appendChild(particle);
    }
    
    // Remove the particles container after animation completes
    particlesContainer.addEventListener("animationend", () => {
        particlesContainer.innerHTML = "";
    });
}

// Add event listener to trigger heart particles on click
document.addEventListener("click", createHeartParticles, { once: false });
