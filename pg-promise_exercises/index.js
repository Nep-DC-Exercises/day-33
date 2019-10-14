const db = require("./conn.js");
var co = require("co");
const prompt = require("prompt-promise");


co(function* genPrompt() {
    let name = yield prompt("Name of Restaurant: ");
    let address = yield prompt("Restaurant Address: ");
    let category = yield prompt("Restaurant Category: ");

    return yield [name, address, category];
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
        `INSERT INTO restaurant (name, address, category) 
        VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}')`)
    .then((res) => {
        if (res.rowCount == 1) {
            console.log("Entry was successful.")
        }
        process.exit()
    })
    .catch((err) => console.log("Entry was not successful", err))
}
