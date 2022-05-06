const sql = require("./db.js");

// constructor
const Produit = function (produit) {
  this.nom_produits = produit.nom_produits;
  this.image_produits = produit.image_produits;
  this.prix_produits = produit.prix_produits;
  this.id_categorie = produit.id_categorie;
};

Produit.create = (newProduit, result) => {
  sql.query("INSERT INTO produits SET ?", newProduit, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created Produit: ", { id: res.insertId, ...newProduit });
    result(null, { id: res.insertId, ...newProduit });
  });
};

Produit.findById = (id_produits, result) => {
  sql.query(
    `SELECT p.id_produits, p.id_categorie, p.image_produits, p.nom_produits, p.prix_produits, cp.nom_categorie as categorie_produits, sum(f.stock_produits) as stock FROM produits as p inner join categorie_produits as cp inner join fournissements as f where p.id_produits = f.id_produits and p.id_categorie = cp.id_categorie and p.id_produits = ${id_produits} group by p.id_produits`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found produit: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Produit.getAll = (result) => {
  sql.query(
    "SELECT p.id_produits, p.id_categorie, p.image_produits, p.nom_produits, p.prix_produits, cp.nom_categorie as categorie_produits, sum(f.stock_produits)/2 as stock FROM produits as p inner join fournissements as f inner join categorie_produits as cp inner join statut_produits as sp where p.id_produits = f.id_produits and p.id_categorie = cp.id_categorie and p.id_statut = 1 group by p.id_produits;",
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

Produit.getAllIndisponible = (result) => {
  sql.query(
    "SELECT p.id_produits, p.image_produits, p.id_categorie, p.nom_produits, p.prix_produits, cp.nom_categorie as categorie_produits, sum(f.stock_produits) as stock, p.date_modification FROM produits as p inner join fournissements as f inner join categorie_produits as cp inner join statut_produits as sp where p.id_produits = f.id_produits and p.id_categorie = cp.id_categorie and p.id_statut = 2 group by p.id_produits order by p.date_modification asc;",
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

Produit.getAll5 = (result) => {
  sql.query(
    "SELECT p.id_produits, p.image_produits, p.id_categorie, p.nom_produits, p.prix_produits, cp.nom_categorie as categorie_produits, sum(f.stock_produits) as stock FROM produits as p inner join categorie_produits as cp inner join fournissements as f where p.id_produits = f.id_produits and p.id_categorie = cp.id_categorie and id_statut=1 group by p.id_produits having SUM(f.stock_produits) < 6;",
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

Produit.updateById = (id, Produit, result) => {
  sql.query(
    `UPDATE Produits SET nom_produits = ?, image_produits = ?, prix_produits = ?, id_categorie = ?, date_modification=date_add(now(),interval 1 hour) WHERE id_produits = ${id}`,
    [
      Produit.nom_produits,
      Produit.image_produits,
      Produit.prix_produits,
      Produit.id_categorie,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated Produit: ", { id: id, ...Produit });
      result(null, { id: id, ...Produit });
    }
  );
};

Produit.modifyStatus = (id, result) => {
  sql.query(
    `UPDATE Produits SET id_statut= 2, date_modification=date_add(now(),interval 1 hour) WHERE id_produits = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("modify Produit: ", { id: id });
      result(null, res);
    }
  );
};

Produit.restoreStatus = (id, result) => {
  sql.query(
    `UPDATE Produits SET id_statut= 1, date_modification=now() WHERE id_produits = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("restored Produit: ", { id: id });
      result(null, res);
    }
  );
};

Produit.remove = (id, result) => {
  sql.query("DELETE FROM Produits WHERE id_produits = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted Produit with id: ", id);
    result(null, res);
  });
};

module.exports = Produit;
