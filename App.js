const express = require('express');
const { usersRoutes } = require('./routes/UsersRoutes');
const { repairsRoutes } = require('./routes/RepairsRoutes');
const { globalErrorHandler } = require('./controllers/errorController');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const cors = require('cors');
const App = express();

App.use(cors());

App.use(express.json());

App.use(helmet());

App.use(compression());
//log incoming request
//morgan ('dev')    ('combined')
if (process.env.NODE_ENV === 'development') App.use(morgan('dev'));
else App.use(morgan('combined'));

App.use('/api/v1/users', usersRoutes);
App.use('/api/v1/repairs', repairsRoutes);

App.use('*', globalErrorHandler);
module.exports = { App };
