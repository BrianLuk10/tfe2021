module.exports = (app) => {
  const fournissement2 = require("../controllers/fournissement2.controller.js");

  app.put("/fournissement/stock/:id", fournissement2.decrementer);
};
