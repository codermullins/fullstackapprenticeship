const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({ 
  id: String,
  firstName: String,
  lastName: String,
  mentor: String,
  apprenticeshipId: String,
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
  createdAt: Date,

});
module.exports = mongoose.model('User', UserSchema);