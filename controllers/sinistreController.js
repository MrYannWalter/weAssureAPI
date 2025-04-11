const Sinistre = require('../models/Sinistre');

// Create a new claim
const createSinistre = async (req, res) => {
  try {
    const sinistre = new Sinistre(req.body);
    await sinistre.save();
    res.status(201).send(sinistre);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all claims
const getSinistres = async (req, res) => {
  try {
    const sinistres = await Sinistre.find();
    res.status(200).send(sinistres);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a claim by ID
const getSinistreById = async (req, res) => {
  try {
    const sinistre = await Sinistre.findById(req.params.id);
    if (!sinistre) {
      return res.status(404).send();
    }
    res.status(200).send(sinistre);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a claim by ID
const updateSinistre = async (req, res) => {
  try {
    const sinistre = await Sinistre.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!sinistre) {
      return res.status(404).send();
    }
    res.status(200).send(sinistre);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a claim by ID
const deleteSinistre = async (req, res) => {
  try {
    const sinistre = await Sinistre.findByIdAndDelete(req.params.id);
    if (!sinistre) {
      return res.status(404).send();
    }
    res.status(200).send(sinistre);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createSinistre,
  getSinistres,
  getSinistreById,
  updateSinistre,
  deleteSinistre
};
