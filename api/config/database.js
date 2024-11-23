const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mis_tareas', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;