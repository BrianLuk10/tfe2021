const Fournissement2 = require("../models/fournissement2.model.js");

exports.decrementer = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  Fournissement2.decrementerStock(
    req.params.id,
    new Fournissement2(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found fournissement with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating fournissement with id " + req.params.id,
          });
        }
      } else res.send(data);
    }
  );
};
