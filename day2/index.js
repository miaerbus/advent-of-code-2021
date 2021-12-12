const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    const FORWARD = "forward";
    const UP = "up";
    const DOWN = "down";
    let vertical = 0;
    let horizontal = 0;
    let aim = 0;

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        const splittedLine = line.split(" ");
        const command = splittedLine[0];
        const value = parseInt(splittedLine[1]);

        if (command === FORWARD) {
            horizontal += value;
            vertical += aim * value;
        }
        if (command === UP) {
            aim -= value;
        }
        if (command === DOWN) {
            aim += value;
        }
    }

    console.log(horizontal * vertical); // 1971095320
}

processLineByLine();