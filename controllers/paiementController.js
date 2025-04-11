const Paiement = require('../models/Paiement');

// Create a new payment
const createPaiement = async (req, res) => {
  try {
    const paiement = new Paiement(req.body);
    await paiement.save();
    res.status(201).send(paiement);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all payments
const getPaiements = async (req, res) => {
  try {
    const paiements = await Paiement.find();
    res.status(200).send(paiements);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a payment by ID
const getPaiementById = async (req, res) => {
  try {
    const paiement = await Paiement.findById(req.params.id);
    if (!paiement) {
      return res.status(404).send();
    }
    res.status(200).send(paiement);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a payment by ID
const updatePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!paiement) {
      return res.status(404).send();
    }
    res.status(200).send(paiement);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a payment by ID
const deletePaiement = async (req, res) => {
  try {
    const paiement = await Paiement.findByIdAndDelete(req.params.id);
    if (!paiement) {
      return res.status(404).send();
    }
    res.status(200).send(paiement);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPaiement,
  getPaiements,
  getPaiementById,
  updatePaiement,
  deletePaiement
};
