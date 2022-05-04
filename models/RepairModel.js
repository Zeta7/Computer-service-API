const { dataBase } = require('../utils/DataBase');
const { DataTypes } = require('sequelize');

const Repair = dataBase.define('repair', {
    id: {
        primaryKey: true.valueOf,
        autoIncrement: true,
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending',
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = { Repair };
