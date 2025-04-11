const Document = require('../models/Document');

// Create a new document
const createDocument = async (req, res) => {
  try {
    const document = new Document(req.body);
    await document.save();
    res.status(201).send(document);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all documents
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find();
    res.status(200).send(documents);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a document by ID
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).send();
    }
    res.status(200).send(document);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a document by ID
const updateDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!document) {
      return res.status(404).send();
    }
    res.status(200).send(document);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a document by ID
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findByIdAndDelete(req.params.id);
    if (!document) {
      return res.status(404).send();
    }
    res.status(200).send(document);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument
};
