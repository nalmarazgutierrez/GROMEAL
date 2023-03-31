var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); // add at the top

var authRouter = require('./routes/auth');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var plansRouter = require('./routes/plans');
var recipesRouter = require('./routes/recipes');
var listRouter = require('./routes/list');

var app = express();

app.use(cors()); // add after 'app' is created
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authRouter);
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/plans', plansRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/list', listRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});


// General error handler
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({ error: err.message });
});

module.exports = app;
