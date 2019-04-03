const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ 
  id: String,
  fName: String,
  lName: String,
  mentor: String,
  xp: Number,
  apprenticeshipId: String,
  productId: String,
  masteryId: String,
  experience: String,   
  communityRank: String,
  technicalRank: String,
  github: String,
  linkedIn: String,
  instructor: Boolean,
  city: String,
  stripe: String,
  paypal: String,
  country: String,
  expo: String,
  createdAt: Date,

});
module.exports = mongoose.model('User', UserSchema);