const mongoose = require("mongoose");

const sinistreSchema = new mongoose.Schema({
  contrat: { type: mongoose.Schema.Types.ObjectId, ref: "Contrat", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  description: { type: String, required: true },
  dateDeclaration: { type: Date, default: Date.now },
  statut: { type: String, enum: ["en attente", "traité", "rejeté"], default: "en attente" },
  montantEstime: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model("Sinistre", sinistreSchema);
