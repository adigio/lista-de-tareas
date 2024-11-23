const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mis_tareas', 'user', 'pass', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;