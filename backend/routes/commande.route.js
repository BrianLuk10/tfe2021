module.exports = (app) => {
  const commande = require("../controllers/commande.controller.js");

  app.post("/commande", commande.create);

  app.post("/commande2", commande.create2);

  app.get("/commande", commande.findAll);

  app.get("/commande/days", commande.findAll7Days);

  app.get("/commande/month", commande.findAllMonth);

  app.get("/commande/year", commande.findAllYear);

  app.get("/commande/:id", commande.findOne);

  app.delete("/commande/:id", commande.delete);
};
