var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var flash = require('express-flash');
var session = require('express-session');

var indexRouter = require('./routes/example/index');
var booksApiRouter = require('./routes/example/books_api');
var usersApiRouter = require('./routes/example/users_api');
var inventoriesApiRouter = require('./routes/example/inventories_api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Function to serve all static files
// inside public directory.
app.use(express.static('public'));
app.use('/images', express.static('images'));
// http://localhost:7755/images/ee56a1fd60a2ce90a5c40fd274192963.png

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    cookie: { maxAge: 60000 },
    store: new session.MemoryStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}))

app.use(flash());



app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/books', booksRouter);

app.use('/booksapi', booksApiRouter);
app.use('/usersapi', usersApiRouter);
app.use('/inventoriesapi', inventoriesApiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;