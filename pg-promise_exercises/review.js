const db = require("./conn.js");
var co = require("co");
const prompt = require("prompt-promise");

// Create Review
// reviewer_id, stars, title, review, restaurant_id

co(function* genPrompt() {
    let reviewerId = yield prompt("Reviewer Id: ");
    let stars = yield prompt("Stars: ");
    let title = yield prompt("Review Title: ");
    let review = yield prompt("Review Body: ");
    let restaurantId = yield prompt("Restaurant Id: ");
    return yield [reviewerId, stars, title, review, restaurantId];
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
        `INSERT INTO review (reviewer_id, stars, title, review, restaurant_id) 
        VALUES ('${arr[0]}', '${arr[1]}', '${arr[2]}', '${arr[3]}', '${arr[4]}')`)
    .then((res) => {
        if (res.rowCount == 1) {
            console.log("Entry was successful.")
        }
        process.exit()
    })
    .catch((err) => console.log("Entry was not successful", err))
}