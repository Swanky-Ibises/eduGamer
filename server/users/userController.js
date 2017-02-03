var User = require('./userModel');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');




module.exports = {
  //function for signin in user
  signup: function(req, res, next) {
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        //if the user profile does not exist, we will create the new user
        if (!userProfile) {
          //hashes the password
          bcrypt.hash(password, null, null, function(err, hash) {
            if (err) {
              console.log('Error', err);
            } else {
              //create the user profile in the database and save
              console.log('hash is ', hash);
              var newUser = new User({
                username: username,
                password: hash,
                highscoreMem: 0,
                highscoreScram: 0,
                memScores: [],
                scramScores: []
              });
              newUser.save(function(err, user) {
                if (err) {
                  console.log('SAVE ERROR', err);
                }
                console.log('user saved here', user);
                req.session.user = username;
                res.send({redirect: '/#/'});
              });
            }
          });
        //if the user already exists...
        } else {
          res.send('Account already exists');
        }
      });
    // next();
  },
  //function for logging in user
  login: function(req, res, next) {
    console.log('username is ', req.body.username);
    console.log('password is ', req.body.password);
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({username: username})
      .exec(function(err, userProfile) {
        if (!userProfile) {
          res.send('User does not exist');
        } else {
          //bcrypt compare
          bcrypt.compare(password, userProfile.password, function(err, match) {
            if (match) {
              console.log('passwords match');
              req.session.user = username;
              res.send({redirect: '/#/'});
            } else {
              res.send('Password is incorrect');
            }
          });
        }
      });
  },

  postScore: function(req, res, next) {
    if (req.body.username) {
      var username = req.body.username;
      var gametype = req.body.gametype;
      var score = req.body.score;
      User.findOne({username: username})
        .exec(function(err, userProfile) {
          if (err) {
            console.log('error when posting score');
            res.status(500).send(err);
          } else {
            //push the score into the gametype array
            userProfile[gametype + 'Array'].push(score);
            console.log('array is ', userProfile[gametype + 'Array']);
            //here we compare the request score to the saved highscore
            if (score > userProfile[gametype + 'High'] || !userProfile[gametype + 'High']) {
              userProfile[gametype + 'High'] = score;
              console.log('new high score recorded');
            }
            userProfile.save(function(err, user) {
              if (err) {
                console.log('Error when posting score');
                res.status(500).send(err);
              } else {
                res.status(201).send('posted score');
              }
            });
          }
        });
    }
  },
  getAll: function(req, res, next) {
    User.find({}).exec(function(err, users) {
      if (err) {
        console.log('Error getting users', err);
        res.status(500).send(err);
      } else {
        res.status(200).send(users);
      }
    });
  },
  getUser: function(req, res, next) {
    if (!req.session.user) {
      res.send({redirect: '/#/login'});
    } else {
      User.findOne({username: req.params.username}).exec(function(err, user) {
        if (err) {
          console.log('error in fetching user');
          res.send(err);
        } else {
          var userObject = {
            username: user.username,
            highscoreMem: user.memoryHigh,
            highscoreScram: user.scrambleHigh,
            memScores: user.memoryArray,
            scramScores: user.scrambleArray
          }
          res.send(userObject);
        }
      });
    }
  }
};

