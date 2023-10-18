// Configuration for linear story parsing
const config = {
  delimiter: "\n",
  paragraphTag: "p"
};

// Display the parsed story
function displayStory() {
  const storyText = localStorage.getItem('story'); // Replace `Your novel text goes here` with your novel text
  const storyContainer = document.getElementById("parsed-story");
  const paragraphs = storyText.split(config.delimiter);
  let currentIndex = 0;

  function updateStory(content, paragraphTag) {
    const paragraphElement = document.createElement(paragraphTag);
    paragraphElement.textContent = content;
    storyContainer.appendChild(paragraphElement);
  }

  const lines = storyText.split("\n");
  let currentEpisode = "";
  let currentBranch = "";
  let currentText = "";
  let choices = [];
  let choiceMade = false;

  function findBranchIndex(lines, branchName) {
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith(`branch("${branchName}")`)) {
        return i + 1;
      }
    }
    return -1;
  }

  function processBranch(lines, startIndex) {
    let i = startIndex;
    while (i < lines.length) {
      const line = lines[i].trim();

      if (line.startsWith('title(')) {
        const title = line.match(/"([^"]*)"/)[1];
        updateStory(`Title: ${title}`, config.paragraphTag);
      } else if (line.startsWith('author(')) {
        const author = line.match(/"([^"]*)"/)[1];
        updateStory(`Author: ${author}`, config.paragraphTag);
      } else if (line.startsWith('start()')) {
        updateStory('--- Novel Start ---', config.paragraphTag);
      } else if (line.startsWith('episode(')) {
        const episodeName = line.match(/"([^"]*)"/)[1];
        updateStory(`Episode: ${episodeName}`, config.paragraphTag);
        currentEpisode = episodeName;
      } else if (line.startsWith('branch(')) {
        const branchName = line.match(/"([^"]*)"/)[1];
        updateStory(`- ${branchName}`, config.paragraphTag);
        currentBranch = branchName;
      } else if (line.startsWith('text("')) {
        const text = line.match(/"([^"]*)"/)[1];
        updateStory(`"${text}"`, config.paragraphTag);
        currentText = text;
      } else if (line.startsWith('choice(')) {
        const choiceTexts = line.match(/"([^"]*)"/g).map(match => match.slice(1, -1));
        choices = choiceTexts;
        updateStory('Choices:', config.paragraphTag);
        choices.forEach((choice, index) => {
          updateStory(`${index + 1}. ${choice}`, config.paragraphTag);
        });
        const answer = 3; // Replace 3 with the index of the choice you want to select
        const targetBranches = line.match(/=>\s*\(([^)]+)\)/)[1].split(',').map(target => target.trim());
        const targetIndex = answer - 1;
        if (targetIndex >= 0 && targetIndex < choices.length) {
          choiceMade = true;
          const targetBranch = targetBranches[targetIndex].replace(/"/g, '');
          updateStory(`Selected target: ${targetBranch}`, config.paragraphTag);
          const targetBranchIndex = findBranchIndex(lines, targetBranch);

          if (targetBranchIndex !== -1) {
            processBranch(lines, targetBranchIndex);
          } else if (targetBranch === 'move') {
            i++;
          } else {
            updateStory('The novel is finished.', config.paragraphTag);
            return;
          }
        } else {
          updateStory('Invalid choice.', config.paragraphTag);
          return;
        }
      } else if (line.startsWith('end()')) {
        updateStory('The novel is finished.', config.paragraphTag);
        return;
      } else if (line.startsWith('move()')) {
        i++;
      }

      i++;
    }
  }

  processBranch(lines, 0);
}

// Function to create heart particles
function createHeartParticles(event) {
  const numParticles = 10;
  const particlesContainer = document.querySelector(".heart-particles");

  for (let i = 0; i < numParticles; i++) {
    const particle = document.createElement("div");
    particle.classList.add("heart-particle");
    particle.style.left = event.clientX - 7 + "px"; // Half width of particle
    particle.style.top = event.clientY - 7 + "px"; // Half height of particle
    particlesContainer.appendChild(particle);
  }

  // Remove the particles container after animation completes
  particlesContainer.addEventListener("animationend", () => {
    particlesContainer.innerHTML = "";
  });
}

// Add event listener to trigger heart particles on click
document.addEventListener("click", createHeartParticles, {
  once: false
});

function SaveStory() {
  const storyPopup = document.getElementById('story');
  storyPopup.style.display = 'none';
}