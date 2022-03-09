module.exports = (app) => {
  const fournissement = require("../controllers/fournissement.controller.js");

  app.post("/fournissement", fournissement.create);

  app.get("/fournissement", fournissement.findAll);

  app.get("/fournissement/:id", fournissement.findOne);

  app.put("/fournissement/:id", fournissement.update);

  app.put("/fournissement/stock/:id", fournissement.decrementer);

  app.delete("/fournissement/:id", fournissement.delete);
};
