const sql = require("./db.js");

const Commande2 = function (commande2) {
  this.id_etat = commande2.id_etat;
};

Commande2.updateState = (id, Commande2, result) => {
  sql.query(
    `update commandes set id_etat = ?, date_commandes = date_commandes where id_commandes = ${id}`,
    [Commande2.id_etat, id],
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
