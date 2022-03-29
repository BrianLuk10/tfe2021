module.exports = (app) => {
  const commande = require("../controllers/commande2.controller.js");

  app.put("/commande/:id", commande.updateState);
};
