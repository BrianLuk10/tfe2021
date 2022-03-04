const Historique = require("../models/historique.model.js");

exports.findAll = (req, res) => {
  Historique.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Historique.",
      });
    else res.send(data);
  });
};

exports.delete = (req, res) => {
  Historique.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Historique with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Historique with id " + req.params.id,
        });
      }
    } else res.send({ message: `Historique was deleted successfully!` });
  });
};
