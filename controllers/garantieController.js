const Garantie = require('../models/Garantie');
const bcrypt = require('bcrypt');

// Create a new guarantee
const createGarantie = async (req, res) => {
  try {
    const hashedAttributes = {};
    for (const key in req.body) {
      if (key === 'description' || key === 'nom') {
        hashedAttributes[key] = await bcrypt.hash(req.body[key], 10);
      } else {
        hashedAttributes[key] = req.body[key];
      }
    }
    const garantie = new Garantie(hashedAttributes);
    await garantie.save();
    res.status(201).send(garantie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all guarantees
const getGaranties = async (req, res) => {
  try {
    const garanties = await Garantie.find();
    res.status(200).send(garanties);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a guarantee by ID
const getGarantieById = async (req, res) => {
  try {
    const garantie = await Garantie.findById(req.params.id);
    if (!garantie) {
      return res.status(404).send();
    }
    res.status(200).send(garantie);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a guarantee by ID
const updateGarantie = async (req, res) => {
  try {
    const garantie = await Garantie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!garantie) {
      return res.status(404).send();
    }
    res.status(200).send(garantie);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a guarantee by ID
const deleteGarantie = async (req, res) => {
  try {
    const garantie = await Garantie.findByIdAndDelete(req.params.id);
    if (!garantie) {
      return res.status(404).send();
    }
    res.status(200).send(garantie);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createGarantie,
  getGaranties,
  getGarantieById,
  updateGarantie,
  deleteGarantie
};
