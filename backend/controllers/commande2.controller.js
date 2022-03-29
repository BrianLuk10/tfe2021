const Commande2 = require("../models/commande2.model.js");

exports.updateState = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Commande2.updateState(req.params.id, new Commande2(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found produit with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Error updating produit with id " + req.params.id,
        });
      }
    } else res.send(data);
  });
};
