const db = require("./conn.js");

db.query("SELECT * FROM restaurant").then(response =>
    response.map(r => console.log(r.name))
);

db.end();