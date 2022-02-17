const sql = require("./db.js");

// constructor
const Fournissement = function (fournissement) {
  this.id_produits = fournissement.id_produits;
  this.stock_produits = fournissement.stock_produits;
  this.date_fournissement = fournissement.date_fournissement;
  this.exp_date = fournissement.exp_date;
};

Fournissement.create = (newFournissement, result) => {
  sql.query(
    "INSERT INTO fournissements SET ?",
    newFournissement,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created fournissement: ", {
        id: res.insertId,
        ...newFournissement,
      });
      result(null, { id: res.insertId, ...newFournissement });
    }
  );
};

Fournissement.findById = (id_fournissement, result) => {
  sql.query(
    `SELECT * FROM Fournissements WHERE id_fournissement = ${id_fournissement}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found fournissement: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Fournissement.findByIdProduit = (id_produits, result) => {
  sql.query(
    `SELECT id_fournissements, sum(stock_produits) as stock_produits, date_fournissement, exp_date FROM fournissements where id_produits = "${id_produits}"`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found fournissement: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

Fournissement.getAll = (result) => {
  sql.query("SELECT * FROM fournissements", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Fournissement.updateById = (id, Fournissement, result) => {
  sql.query(
    `update fournissements set stock_produits = 0, date_fournissement = date_fournissement where id_produits = ${id};
    update fournissements set stock_produits = ?, date_fournissement = date_fournissement where id_produits = ${id} and stock_produits > -1 ORDER BY date_fournissement DESC LIMIT 1;`,
    [Fournissement.stock_produits, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated fournissement: ", { id: id, ...Fournissement });
      result(null, { id: id, ...Fournissement });
    }
  );
};

Fournissement.remove = (id, result) => {
  sql.query(
    "DELETE FROM fournissements WHERE id_produits = ?",
    id,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("deleted fournissement with id: ", id);
      result(null, res);
    }
  );
};

/**
Client.findCommandForClient = (ClientId, result) => {
    sql.query(`SELECT us.nom, us.prenom, us.mail,us.tel, ar.art_nom, ar.prix FROM commandes as co join Client as us on co.cli_id = us.id 
    join articles as ar on ar.art_id = co.art_id WHERE us.id ="${ClientId}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Client: ", res);
            result(null, res);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};
*/

module.exports = Fournissement;
