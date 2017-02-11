var mongoose = require('mongoose');


var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  matchingHigh: Number,
  scrambleHigh: Number,
  typingHigh: Number,
  simonHigh: Number,
  matchingArray: [Number],
  scrambleArray: [Number],
  typingArray: [Number],
  simonArray: [Number]
});



module.exports = mongoose.model("User", UserSchema);
