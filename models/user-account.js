var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var userSchema = mongoose.Schema({
  fullName: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

userSchema.pre("save", function (next) {
  var account = this;
  bcrypt.hash(account.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    account.password = hash;
    next();
  });
});

var User = mongoose.model("User", userSchema);
module.exports = User;
