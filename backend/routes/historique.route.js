module.exports = (app) => {
  const historique = require("../controllers/historique.controller.js");

  app.get("/historique", historique.findAll);

  app.delete("/historique/:id", historique.delete);
};
