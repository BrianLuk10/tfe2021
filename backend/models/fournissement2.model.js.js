const sql = require("./db.js");

const Fournissement2 = function (fournissement) {
  this.id_produits = fournissement.id_produits;
  this.stock_produits = fournissement.stock_produits;
  this.date_fournissement = fournissement.date_fournissement;
  this.exp_date = fournissement.exp_date;
  this.nombre = fournissement.nombre;
};

Fournissement2.decrementerStock = (id, Fournissement2, result) => {
  sql.query(
    `update fournissements set stock_produits = GREATEST(0, stock_produits - ?) , date_fournissement = date_fournissement where id_produits = ${id} and stock_produits > -1 ORDER BY date_fournissement DESC LIMIT 1;`,
    [Fournissement2.nombre, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated fournissement: ", { id: id, ...Fournissement2 });
      result(null, { id: id, ...Fournissement2 });
    }
  );
};

module.exports = Fournissement2;
