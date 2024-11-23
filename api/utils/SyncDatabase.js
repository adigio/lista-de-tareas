const sequelize = require('../config/database');
const Task = require('../models/Task');

sequelize.sync()
    .then(() => console.log('Se ha sincronizado correctamente la base de datos'))
    .catch((err) => console.log('Error al sincronizar la base de datos:', err));