const pg = require("pg");
const settings = require("./settings");
const input = process.argv.slice(2)[0];

const connection = {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname
};


const knex = require("knex")({
    client: 'pg',
    connection: connection
});

knex.select('first_name', 'last_name').from('famous_people').where({ first_name: input })
    .then(function(rows) {
        rows.forEach (function(row) {
            console.log(row);
        })
    }).finally(function() {
        knex.destroy();
    })