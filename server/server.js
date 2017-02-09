var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var userController = require('./users/userController.js');
var session = require('express-session');
var morgan = require('morgan');
var app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(session({
  user: null,
  secret: 'master of my domain',
  cookie: {maxAge: 31536000000},
  resave: false,
  saveUninitialized: true
}));

//require login
var requireLogin = function(req, res, next) {
  req.session.user ? res.render('/profile') : res.redirect('/login');
};

//to remove the mongoose Promise deprecated warning
mongoose.Promise = global.Promise;

//Mongoose
// var uri;
// process.env.PORT ? uri = config.web : uri = config.local;
var mLabUri = 'mongodb://' + process.env.DBUSER + ':' + process.env.DBPASS + '@ds147069.mlab.com:47069/heroku_9lgrcthv';
var localMongoUri = 'mongodb://localhost/membrain';
var MONGO_URI = (process.env.NODE_ENV === 'production') ? mLabUri : localMongoUri;
mongoose.connect(MONGO_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection to mongoose error:'));
db.once('open', function() {
  console.log('Connected to:', MONGO_URI);
});


//define port
var port = process.env.PORT || 3000;

var rootPath = path.join(__dirname, '/..');
var publicPath = path.join(rootPath, '/compiled/public');
app.use(express.static(path.join(__dirname, '../')));

//routes
//get routes
// app.get('/', function(req, res) {
//   res.sendFile('hello world from server');
// });
app.get('/signup', function(req, res) {
  res.send('This is where we would serve the signup');
});
app.get('/login', function(req, res) {
  res.send('This is where we would serve the login');
});
app.get('/memory', function(req, res) {
  res.send('This is where we would serve the memory game');
});
app.get('/scramble', function(req, res) {
  res.send('This is where we would serve the scramble game');
});
app.get('/:username', userController.getUser);
app.get('/leaderboard', userController.getAll);

//post routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/scores', userController.postScore);
app.post('/logout', userController.logout);


app.listen(port, function () {
  console.log('Membrain server listening on port', port);
  console.log('process.env.NODE_ENV is:', process.env.NODE_ENV);
});
