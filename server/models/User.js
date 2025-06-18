const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skillsOffered: [{ type: String }], // Skills user can teach
  skillsWanted: [{ type: String }], // Skills user wants to learn
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
