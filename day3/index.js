const fs = require('fs');
const readline = require('readline');

async function processLineByLine() {
    const fileStream = fs.createReadStream('input.txt');
    let oxygen_generator_rating;
    let co2_scrubber_rating;
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    let countZeros = 0;
    let countOnes = 0;
    let zeros = [];
    let ones = [];

    for await (const line of rl) {
        // Each line in input.txt will be successively available here as `line`.

        if (parseInt(line.charAt(0)) === 0) {
            countZeros++;
            zeros.push(line);
        } else {
            countOnes++;
            ones.push(line);
        }
    }

    if (countZeros > countOnes) {
        oxygen_generator_rating = oxygenRating(zeros, 1);
        co2_scrubber_rating = co2Rating(ones, 1);
    } else {
        oxygen_generator_rating = oxygenRating(ones, 1);
        co2_scrubber_rating = co2Rating(zeros, 1);
    }

    let oxygen = parseInt(oxygen_generator_rating.join(''), 2); // 1599
    let co2 = parseInt(co2_scrubber_rating.join(''), 2);        // 3716

    console.log(oxygen * co2); // 5941884
}

function co2Rating(array, i) {
    let countZeros = 0;
    let countOnes = 0;
    let zeros = [];
    let ones = [];

    if (array.length === 1) {
        return array;
    }

    for (const line of array) {
        if (parseInt(line.charAt(i)) === 0) {
            countZeros++;
            zeros.push(line);
        } else {
            countOnes++;
            ones.push(line);
        }
    }

    if (countZeros <= countOnes) {
        return co2Rating(zeros, i + 1);
    }
    return co2Rating(ones, i + 1);
}

function oxygenRating(array, i) {
    let countZeros = 0;
    let countOnes = 0;
    let zeros = [];
    let ones = [];

    if (array.length === 1) {
        return array;
    }

    for (const line of array) {
        if (parseInt(line.charAt(i)) === 0) {
            countZeros++;
            zeros.push(line);
        } else {
            countOnes++;
            ones.push(line);
        }
    }

    if (countZeros > countOnes) {
        return oxygenRating(zeros, i + 1);
    }
    return oxygenRating(ones, i + 1);
}

processLineByLine();