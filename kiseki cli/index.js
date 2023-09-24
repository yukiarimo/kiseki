'use strict'

const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
});

// Read the .kiseki file
const kisekiContent = fs.readFileSync('novel.kiseki', 'utf-8');

// Split content into lines
const lines = kisekiContent.split('\n');

// Initialize variables
let currentEpisode = '';
let currentBranch = '';
let currentText = '';
let choices = [];
let choiceMade = false; // Flag to indicate if a choice was made

// Function to process a branch
function processBranch(lines, startIndex) {
    let i = startIndex;
    while (i < lines.length) {
        const line = lines[i].trim();

        if (line.startsWith('branch(')) {
            const branchName = line.match(/"([^"]*)"/)[1];
            console.log(`\n- ${branchName}`);
            currentBranch = branchName;
        } else if (line.startsWith('choice(')) {
            const choiceTexts = line.match(/"([^"]*)"/g).map(match => match.slice(1, -1));
            choices = choiceTexts;
            const targetBranches = line.match(/=>\s*\(([^)]+)\)/)[1].split(',').map(target => target.trim());

            console.log('Choices:');
            choices.forEach((choice, index) => {
                console.log(`${index + 1}. ${choice}`);
            });

            rl.question('Enter your choice: ', answer => {
                const targetIndex = parseInt(answer) - 1;
                if (targetIndex >= 0 && targetIndex < choices.length) {
                    choiceMade = true;
                    const targetBranch = targetBranches[targetIndex].replace(/"/g, ''); // Remove double quotes
                    console.log(`Selected target: ${targetBranch}`);
                    const targetBranchIndex = findBranchIndex(lines, targetBranch);
                    if (targetBranchIndex !== -1) {
                        // Process the choice branch and return when it's finished
                        processBranch(lines, targetBranchIndex);
                        // Continue the main story after the choice branch
                        i = startIndex + 1; // Skip the choice line itself
                        choiceMade = false; // Reset the choice flag
                        currentText = ''; // Clear the current text
                    } else {
                        console.log('The novel is finished.');
                        rl.close();
                    }
                } else {
                    console.log('Invalid choice.');
                    rl.close();
                }
            });
            return; // Stop processing the current branch
        } else if (line.startsWith('episode(')) {
            const episodeName = line.match(/"([^"]*)"/)[1];
            console.log(`\n${episodeName}`);
            currentEpisode = episodeName;
        } else if (line.startsWith('text("')) {
            const text = line.match(/"([^"]*)"/)[1];
            console.log(`\n"${text}"`);
            currentText = text;
        }

        i++; // Move to the next line

        // Check if a choice was made and continue the main story after the choice
        if (choiceMade) {
            break; // Exit the loop to continue processing the main story
        }
    }
    console.log('The novel is finished.');
    rl.close();
}

// Start parsing from the beginning
processBranch(lines, 0);

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