const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: Number, enum: [0, 1], required: true } // 0: admin, 1: client
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
