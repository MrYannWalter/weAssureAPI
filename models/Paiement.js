const mongoose = require("mongoose");

const paiementSchema = new mongoose.Schema({
  contrat: { type: mongoose.Schema.Types.ObjectId, ref: "Contrat", required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  montant: { type: Number, required: true },
  datePaiement: { type: Date, default: Date.now },
  modePaiement: { type: String, enum: ["carte", "virement", "chèque"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("Paiement", paiementSchema);
