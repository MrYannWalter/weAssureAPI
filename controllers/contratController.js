const Contrat = require('../models/Contrat');

// Create a new contract
const createContrat = async (req, res) => {
  try {
    const contrat = new Contrat(req.body);
    await contrat.save();
    res.status(201).send(contrat);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all contracts
const getContrats = async (req, res) => {
  try {
    const contrats = await Contrat.find();
    res.status(200).send(contrats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a contract by ID
const getContratById = async (req, res) => {
  try {
    const contrat = await Contrat.findById(req.params.id);
    if (!contrat) {
      return res.status(404).send();
    }
    res.status(200).send(contrat);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a contract by ID
const updateContrat = async (req, res) => {
  try {
    const contrat = await Contrat.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!contrat) {
      return res.status(404).send();
    }
    res.status(200).send(contrat);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a contract by ID
const deleteContrat = async (req, res) => {
  try {
    const contrat = await Contrat.findByIdAndDelete(req.params.id);
    if (!contrat) {
      return res.status(404).send();
    }
    res.status(200).send(contrat);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createContrat,
  getContrats,
  getContratById,
  updateContrat,
  deleteContrat
};
