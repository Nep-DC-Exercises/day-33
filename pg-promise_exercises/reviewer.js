const db = require("./conn.js");
var co = require("co");
const prompt = require("prompt-promise");

// Create Reviewer
// name, email, karma

co(function* genPrompt() {
    let name = yield prompt("Name of Reviewer: ");
    let email = yield prompt("Reviewer Email: ");
    let karma = yield prompt("Reviewer Karma: ");

    return yield [name, email, karma];
})
    .then(function fulfilled(array) {
        dbInsert(array);
        prompt.end();
    })
    .catch(function rejected(err) {
        console.log("error:", err.stack);
        process.stdin.pause();
    });

function dbInsert(arr) {
    db.result(
        `INSERT INTO reviewer (name, email, karma) 
        VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}')`)
    .then((res) => {
        if (res.rowCount == 1) {
            console.log("Entry was successful.")
        }
        process.exit()
    })
    .catch((err) => console.log("Entry was not successful", err))
}