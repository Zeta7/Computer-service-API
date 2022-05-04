const { DataTypes } = require('sequelize');
const { dataBase } = require('../utils/DataBase');

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
    computerNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comments: {
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
