const sql = require("./db.js");

const Commande = function (commande) {
  this.id_produits = commande.id_produits;
  this.nombre = commande.nombre;
};

Commande.create = (Commande, result) => {
  sql.query(
    `insert into commandes set date_commandes = CURRENT_TIMESTAMP, etat_commandes = 'payé';`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created commande: ", {
        id: res.insertId,
        ...Commande,
      });
      result(null, { id: res.insertId, ...Commande });
    }
  );
};

Commande.create2 = (Commande, result) => {
  sql.query(
    `insert into commande_produit set id_commandes = (select max(id_commandes) from commandes), id_produits = ?, nombre = ?`,
    [Commande.id_produits, Commande.nombre],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created commande: ", {
        ...Commande,
      });
      result(null, { ...Commande });
    }
  );
};

Commande.getAll = (result) => {
  sql.query(
    "select cp.id_commandes, GROUP_CONCAT(cp.id_produits) as id_produits, GROUP_CONCAT(p.nom_produits) as nom, GROUP_CONCAT(p.prix_produits) as prix_sep, GROUP_CONCAT(cp.nombre) as nombre_sep, sum(p.prix_produits * cp.nombre) as total, c.date_commandes, c.etat_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes group by c.id_commandes;",
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

Commande.getAllToday = (result) => {
  sql.query(
    "select cp.id_commandes, GROUP_CONCAT(cp.id_produits) as id_produits, GROUP_CONCAT(p.nom_produits) as nom, GROUP_CONCAT(p.prix_produits) as prix_sep, GROUP_CONCAT(cp.nombre) as nombre_sep, sum(p.prix_produits * cp.nombre) as total, c.date_commandes, c.etat_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes where date(c.date_commandes) = CURRENT_DATE group by c.id_commandes;",
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

Commande.getAll7Days = (result) => {
  sql.query(
    "select sum(p.prix_produits * cp.nombre) as total, c.date_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes where c.date_commandes >= CURDATE() - INTERVAL 1 WEEK group by day(c.date_commandes) desc",
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

Commande.getAllMonth = (result) => {
  sql.query(
    "select sum(p.prix_produits * cp.nombre) as total, c.date_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes group by month(c.date_commandes)",
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

Commande.getAllYear = (result) => {
  sql.query(
    "select sum(p.prix_produits * cp.nombre) as total, c.date_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes group by year(c.date_commandes)",
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

Commande.remove = (id, result) => {
  sql.query("DELETE FROM commandes WHERE id_commandes = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("deleted commandes with id: ", id);
    result(null, res);
  });
};

Commande.findById = (id_commandes, result) => {
  sql.query(
    `select cp.id_commandes, GROUP_CONCAT(cp.id_produits) as id_produits, GROUP_CONCAT(p.nom_produits) as nom, GROUP_CONCAT(p.prix_produits) as prix_sep, GROUP_CONCAT(cp.nombre) as nombre_sep, sum(p.prix_produits * cp.nombre) as total, c.date_commandes, c.etat_commandes from commande_produit as cp inner join produits as p inner join commandes as c on p.id_produits = cp.id_produits and c.id_commandes = cp.id_commandes where cp.id_commandes = ${id_commandes};`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found commande: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = Commande;
