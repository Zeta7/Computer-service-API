const { Sequelize }  = require('sequelize');

const dataBase = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: '21/11/1997',
    database: 'services',
    logging: false
});

module.exports = { dataBase };