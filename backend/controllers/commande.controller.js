const Commande = require("../models/commande.model.js");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const commande = new Commande({
    id_commande: req.body.id_commande,
    date_commande: req.body.date_commande,
  });

  Commande.create(commande, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the fournissement.",
      });
    else res.send(data);
  });
};

exports.create2 = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const commande = new Commande({
    id_produits: req.body.id_produits,
    nombre: req.body.nombre,
  });

  Commande.create2(commande, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the commande.",
      });
    else res.send(data);
  });
};

exports.findAll = (req, res) => {
  Commande.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fournissement.",
      });
    else res.send(data);
  });
};

exports.findAllToday = (req, res) => {
  Commande.getAllToday((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving fournissement.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Commande.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found commande with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error retrieving commande with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
  Commande.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found commande with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete commande with id " + req.params.id,
        });
      }
    } else res.send({ message: `commande was deleted successfully!` });
  });
};

exports.findAll7Days = (req, res) => {
  Commande.getAll7Days((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving commande.",
      });
    else res.send(data);
  });
};

exports.findAllMonth = (req, res) => {
  Commande.getAllMonth((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving commande.",
      });
    else res.send(data);
  });
};

exports.findAllYear = (req, res) => {
  Commande.getAllYear((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving commande.",
      });
    else res.send(data);
  });
};
