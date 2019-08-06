const knex = require('knex');

const db = knex({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'tieba_ts',
        timezone: "08:00"
    }
})

module.exports = db;