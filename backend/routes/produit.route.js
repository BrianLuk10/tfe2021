module.exports = (app) => {
  const produit = require("../controllers/produit.controller.js");

  app.post("/produit", produit.create);

  app.get("/produit", produit.findAll);

  app.get("/produit5", produit.findAll5);

  app.get("/produit/:id", produit.findOne);

  app.put("/produit/:id", produit.update);

  app.put("/produitModify/:id", produit.modifyStatus);

  app.put("/produitRestore/:id", produit.restoreStatus);

  app.delete("/produit/:id", produit.delete);
};
