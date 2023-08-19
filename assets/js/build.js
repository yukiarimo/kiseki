document.addEventListener("DOMContentLoaded", function () {
    // Configuration for linear story parsing
    const config = {
        delimiter: "\n", // Delimiter to split story into paragraphs
        paragraphTag: "p" // HTML tag to wrap paragraphs
    };

    // Open the story editor popup
    document.getElementById("edit-story-button").addEventListener("click", function () {
        document.getElementById("story-editor-popup").style.display = "block";
        // Load the story from local storage and populate the textarea
        const savedStory = localStorage.getItem("story");
        if (savedStory) {
            document.getElementById("story-textarea").value = savedStory;
        }
    });

    // Close the story editor popup
    document.getElementById("close-story-popup").addEventListener("click", function () {
        document.getElementById("story-editor-popup").style.display = "none";
    });

    // Save the story to local storage
    document.getElementById("save-story-button").addEventListener("click", function () {
        const story = document.getElementById("story-textarea").value;
        localStorage.setItem("story", story);
        document.getElementById("story-editor-popup").style.display = "none";
    });

    // Display the parsed story
    function displayStory(storyText) {
        storyText = localStorage.getItem("story")
        const storyContainer = document.getElementById("parsed-story");
        const paragraphs = storyText.split(config.delimiter);
        storyContainer.innerHTML = ""; // Clear previous content
        paragraphs.forEach(paragraph => {
            const paragraphElement = document.createElement(config.paragraphTag);
            paragraphElement.textContent = paragraph;
            storyContainer.appendChild(paragraphElement);
        });
    }

    // Example of drag and drop modification
    document.getElementById("story-textarea").addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", event.target.value);
    });

    document.getElementById("story-textarea").addEventListener("drop", function (event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text/plain");
        const target = event.target;
        target.value += "\n" + data;
        displayStory(target.value); // Update parsed story display
    });
})