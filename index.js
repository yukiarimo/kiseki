'use strict';

const readline = require('readline');
const fs = require('fs');

const rl = {
    question: (query, callback) => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question(query, answer => {
            readline.close();
            callback(answer);
        });
    },
    close: () => {
        process.exit(0);
    }
};

// Reading the file
const kisekiContent = fs.readFileSync('novel.kiseki', 'utf8');

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

var branchName;

// Function to process a branch
function processBranch(lines, startIndex) {
    let i = startIndex;
    while (i < lines.length) {
        const line = lines[i].trim();

        if (line.startsWith('title(')) {
            const title = line.match(/"([^"]*)"/)[1];
            console.log(`Title: ${title}`);
        } else if (line.startsWith('author(')) {
            const author = line.match(/"([^"]*)"/)[1];
            console.log(`Author: ${author}`);
        } else if (line.startsWith('start()')) {
            console.log('\n--- Novel Start ---');
        } else if (line.startsWith('episode(')) {
            const episodeName = line.match(/"([^"]*)"/)[1];
            console.log(`\nEpisode: ${episodeName}`);
            currentEpisode = episodeName;
        } else if (line.startsWith('branch(')) {
            const branchName = line.match(/"([^"]*)"/)[1];
            console.log(`\n- ${branchName}`);

            if (branchName == 'move') {
                console.log(true)
                currentBranch = branchName
            } else {
                return
            }

        } else if (line.startsWith('text("')) {
            const text = line.match(/"([^"]*)"/)[1];
            console.log(`\n"${text}"`);
            currentText = text;
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
                    } else if (targetBranch == 'move') {
                        i++; // Increment the index to skip the "move" branch
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
        } else if (line.startsWith('end()')) {
            console.log('The novel is finished.');
            rl.close();
            return;
        } else if (line.startsWith('move()')) {
            // Skip the choices line
            i++;
            processBranch(lines, targetBranchIndex)
        }

        i++; // Move to the next line
    }
}

// Start parsing from the beginning
processBranch(lines, 0);