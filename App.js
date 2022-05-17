const express = require('express');
const { usersRoutes } = require('./routes/UsersRoutes');
const { repairsRoutes } = require('./routes/RepairsRoutes');
const { globalErrorHandler } = require('./controllers/errorController');

const cors = require('cors');
const App = express();

App.use(cors());

App.use(express.json());

App.use('/api/v1/users', usersRoutes);
App.use('/api/v1/repairs', repairsRoutes);

App.use('*', globalErrorHandler);
module.exports = { App };
