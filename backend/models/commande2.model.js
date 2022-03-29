const sql = require("./db.js");

const Commande2 = function (commande2) {
  this.etat_commandes = commande2.etat_commandes;
};

Commande2.updateState = (id, Commande2, result) => {
  sql.query(
    `update commandes set etat_commandes = ? where id_commandes = ${id}`,
    [Commande2.etat_commandes, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      console.log("updated Commande: ", { id: id, ...Commande2 });
      result(null, { id: id, ...Commande2 });
    }
  );
};

module.exports = Commande2;
