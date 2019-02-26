const input = process.argv.slice(2);
const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {

    if (err) {
        return console.error("Connection Error", err);
    }

    console.log('searching...')
    client.query("SELECT first_name, last_name, birthdate FROM famous_people WHERE first_name = $1", input, (err, result) => {
        if (err) {
            return console.error('Error', err);
        }
        let output = result.rows;

        for (let i = 0; i < output.length; i++) {
            console.log(`${[i + 1]} - ${output[i].first_name} ${output[i].last_name}, born ${output[i].birthdate}`)
        }

        client.end();
    });
});