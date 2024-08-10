const Pool = require('pg').Pool;

const pool = new Pool({
    user : "raghavagarwal",
    host : "localhost",
    database : "postgres",
    password : "I@mraghav1",
    port : 5432
})

module.exports = pool;
