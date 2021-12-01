const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    const numbers = [];

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.
        numbers.push(parseInt(line));
    }

    let counter = 0;
    for (let i = 1; i < numbers.length; i++) {
        let prevNumber = numbers[i-1];

        if (numbers[i] > prevNumber) {
            counter++;
        }
    }
    console.log(counter);
}

processLineByLine();