const express = require('express');
const { usersRoutes } = require('./routes/UsersRoutes');
const { repairsRoutes } = require('./routes/RepairsRoutes');
const App = express();

App.use(express.json());

App.use('/api/v1/users', usersRoutes);
App.use('/api/v1/repairs', repairsRoutes);

module.exports = { App };
