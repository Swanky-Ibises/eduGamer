var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var userController = require('./users/userController.js');
var morgan = require('morgan');
var app = express();

//middlewares
app.use(morgan('dev'));
app.use(bodyparser.json());

//to remove the mongoose Promise deprecated warning
mongoose.Promise = global.Promise;

//Mongoose
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

//v2 routes
app.get('/api/v2/user/:username', userController.getUser);
app.get('/api/v2/users', userController.getAll);
app.get('/api/v2/leaderboard/:gametype', userController.leaderBoard);
app.post('/api/v2/user/score', userController.postScore);

//post routes
//v1 routes
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.post('/scores', userController.postScore);
app.post('/logout', userController.logout);
app.get('/:username', userController.getUser);
app.get('/leaderboard', userController.getAll);

app.listen(port, function () {
  console.log('Membrain server listening on port', port);
  console.log('process.env.NODE_ENV is:', process.env.NODE_ENV);
});
