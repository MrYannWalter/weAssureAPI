const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  role: { type: String, enum: ["client", "agent", "admin"], required: true },
  telephone: { type: String },
  adresse: { type: String },
  token: { type: String }, // New attribute
  verificationCode: { type: String } // Add verificationCode attribute
}, { timestamps: true });

module.exports = mongoose.model("Utilisateur", userSchema);
