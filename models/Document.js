const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  url: { type: String, required: true },
  type: { type: String, enum: ["contrat", "sinistre"], required: true },
  referenceId: { type: mongoose.Schema.Types.ObjectId, required: true }, // ID du contrat ou sinistre concerné
  dateUpload: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("Document", documentSchema);
