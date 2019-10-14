const pgp = require('pg-promise') ({
    query: function(e) {
        console.log('QUERY', e.query)
    }
})

const options = {
    host: 'localhost',
    user: 'neporshiso',
    database: 'restaurant2'
}

const db = pgp(options);

module.exports = db;