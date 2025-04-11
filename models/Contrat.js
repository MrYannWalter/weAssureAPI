const mongoose = require("mongoose");

const contratSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  type: { type: String, enum: ["auto", "habitation", "santé", "vie"], required: true },
  dateDebut: { type: Date, required: true },
  dateFin: { type: Date, required: true },
  statut: { type: String, enum: ["actif", "expiré", "résilié"], default: "actif" },
  montant: { type: Number, required: true },
  garanties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Garantie" }],
}, { timestamps: true });

module.exports = mongoose.model("Contrat", contratSchema);
