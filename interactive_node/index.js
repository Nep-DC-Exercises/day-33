const readline = 
require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Give me a number between 1-10? `, (number) => {
    console.log(multiplyByTwo(number));
    readline.close();
})

function multiplyByTwo(num) {
    let response = "";

    if (num >= 10 || num <= 1) {
        response = "Number is out of range.";
    }

    if (num < 10 && num > 1) {
        response = num * 2;
    }
    return response
}