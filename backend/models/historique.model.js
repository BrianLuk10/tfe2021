const sql = require("./db.js");

const Historique = function (historique) {
  this.nom_produits = historique.nom_produits;
  this.image_produits = historique.image_produits;
  this.prix_produits = historique.prix_produits;
  this.id_categorie = historique.id_categorie;
};

Historique.getAll = (result) => {
  sql.query(
    "SELECT h.id_historique, h.id_produits, h.nom_produits, h.prix_produits, sp.etat_statut as statut, h.date_modification, cp.nom_categorie as categorie_produits, sum(f.stock_produits) as stock FROM historique_produits as h inner join fournissements as f inner join statut_produits as sp inner join categorie_produits as cp where h.id_statut = sp.id_statut and h.id_categorie = cp.id_categorie and h.id_produits = f.id_produits group by h.id_historique desc",
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      result(null, res);
    }
  );
};

Historique.remove = (id, result) => {
  sql.query(
    "DELETE FROM historique_produits WHERE id_historique = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("deleted historique with id: ", id);
      result(null, res);
    }
  );
};

module.exports = Historique;
