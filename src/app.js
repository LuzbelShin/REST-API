const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();
require('./database');

app.set('port', process.env.PORT || 8000);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));

app.use(require('./routes/index'));
app.use('/api/users',require('./routes/users'));
app.use('/api/schedules', require('./routes/schedules'));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('img'));

module.exports = app;