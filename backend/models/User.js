const mongoose = require("mongoose");

const contactoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  telefono: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  contactos: [contactoSchema],
  preferencias: {
    transporte: { type: Boolean, default: false },
    mandados: { type: Boolean, default: false },
    medicinas: { type: Boolean, default: false },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
