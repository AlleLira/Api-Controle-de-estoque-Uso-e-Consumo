const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'Mokona987',
        database: 'uso_e_consumo'
    }
});

module.exports = knex;

