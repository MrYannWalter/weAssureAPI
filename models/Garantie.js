const mongoose = require("mongoose");

const garantieSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String },
  montantMax: { type: Number, required: true },
  typeContrat: { type: String, enum: ["auto", "habitation", "santé", "vie"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Garantie", garantieSchema);
