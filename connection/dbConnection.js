const {Pool} = require('pg');

const pool = new Pool({
    user: 'postgres',
    host:'localhost',
    database:'seconddb',
    password:'sai@4080',
    port:5432

});




module.exports = pool;
