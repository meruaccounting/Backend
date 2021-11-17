const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: {
    type: String,
    // default: "admin",
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  day: [
    {
      date: Date,
      hours: Number,
      screenShots: [String],
    },
  ],

  dob: String,
  phn: String,
});

const user = mongoose.model("user", userSchema);

module.exports = user;
