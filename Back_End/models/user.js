const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: false,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
    GoogleId: {
      type: String,
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
