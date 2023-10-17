// Define a function to simulate the behavior of prompt in a browser
function prompt(question) {
    return window.prompt(question);
}

// Define a function to simulate the behavior of console.log
function log(message) {
    console.log(message);
}

// Reading the file (you need to set kisekiContent manually for browser environment)
const kisekiContent = `Your novel content here`;

// Split content into lines
const lines = kisekiContent.split('\n');

// Initialize variables
let currentEpisode = '';
let currentBranch = '';
let currentText = '';
let choices = [];
let choiceMade = false; // Flag to indicate if a choice was made

// Find the index of a specific branch in the lines
function findBranchIndex(lines, branchName) {
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith(`branch("${branchName}")`)) {
            return i + 1; // Return the index of the next line after the branch
        }
    }
    return -1; // Return -1 if the branch is not found
}

// Function to process a branch
function processBranch(lines, startIndex) {
    let i = startIndex;
    while (i < lines.length) {
        const line = lines[i].trim();

        if (line.startsWith('title(')) {
            const title = line.match(/"([^"]*)"/)[1];
            log(`Title: ${title}`);
        } else if (line.startsWith('author(')) {
            const author = line.match(/"([^"]*)"/)[1];
            log(`Author: ${author}`);
        } else if (line.startsWith('start()')) {
            log('\n--- Novel Start ---');
        } else if (line.startsWith('episode(')) {
            const episodeName = line.match(/"([^"]*)"/)[1];
            log(`\nEpisode: ${episodeName}`);
            currentEpisode = episodeName;
        } else if (line.startsWith('branch(')) {
            const branchName = line.match(/"([^"]*)"/)[1];
            log(`\n- ${branchName}`);
            currentBranch = branchName;
        } else if (line.startsWith('text("')) {
            const text = line.match(/"([^"]*)"/)[1];
            log(`\n"${text}"`);
            currentText = text;
        } else if (line.startsWith('choice(')) {
            const choiceTexts = line.match(/"([^"]*)"/g).map(match => match.slice(1, -1));
            choices = choiceTexts;
            const targetBranches = line.match(/=>\s*\(([^)]+)\)/)[1].split(',').map(target => target.trim());

            log('Choices:');
            choices.forEach((choice, index) => {
                log(`${index + 1}. ${choice}`);
            });

            const answer = prompt('Enter your choice: ');
            const targetIndex = parseInt(answer) - 1;
            if (targetIndex >= 0 && targetIndex < choices.length) {
                choiceMade = true;
                const targetBranch = targetBranches[targetIndex].replace(/"/g, ''); // Remove double quotes
                log(`Selected target: ${targetBranch}`);
                const targetBranchIndex = findBranchIndex(lines, targetBranch);

                if (targetBranchIndex !== -1) {
                    // Process the choice branch and return when it's finished
                    processBranch(lines, targetBranchIndex);
                } else if (targetBranch == 'move') {
                    i++; // Increment the index to skip the "move" branch
                } else {
                    log('The novel is finished.');
                    return;
                }
            } else {
                log('Invalid choice.');
                return;
            }
        } else if (line.startsWith('end()')) {
            log('The novel is finished.');
            return;
        } else if (line.startsWith('move()')) {
            // Skip the choices line
            i++;
        }

        i++; // Move to the next line
    }
}

// Start parsing from the beginning
processBranch(lines, 0);