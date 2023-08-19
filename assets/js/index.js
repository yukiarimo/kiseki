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
