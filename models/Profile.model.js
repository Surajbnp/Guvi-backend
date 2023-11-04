const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  userId: { type: String },
  age: { type: Number },
  gender: { type: String },
  address: { type: String },
  mob : {type : Number}
});

const ProfileModel = mongoose.model("Profile", profileSchema);

module.exports = {
  ProfileModel,
};
