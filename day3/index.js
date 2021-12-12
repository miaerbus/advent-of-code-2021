const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    const LINE_LENGTH = 12;
    let gamma_binary = Array(LINE_LENGTH).fill(0);
    let epsilon_binary = Array(LINE_LENGTH).fill(0);
    let zeros = Array(LINE_LENGTH).fill(0);
    let ones = Array(LINE_LENGTH).fill(0);

    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.
    
    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.

        for (let i = 0; i < LINE_LENGTH; i++) {
            if (parseInt(line.charAt(i)) === 0) {
                zeros[i]++;
            } else {
                ones[i]++;
            }
        }
    }
    
    for (let i = 0; i < LINE_LENGTH; i++) {
        if (zeros[i] > ones[i]) {
            gamma_binary[i] = 0;
            epsilon_binary[i] = 1;
        } else {
            gamma_binary[i] = 1;
            epsilon_binary[i] = 0;
        }
    }

    let gamma = parseInt(gamma_binary.join(''), 2);
    let epsilon = parseInt(epsilon_binary.join(''), 2);

    console.log(gamma * epsilon); // 4006064
}

processLineByLine();