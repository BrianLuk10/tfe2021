const sql = require("./db.js");

// constructor
const Produit = function (produit) {
    this.nom_produits = produit.nom_produits;
    this.image_produits = produit.image_produits;
    this.prix_produits = produit.prix_produits;
    this.categorie_produits = produit.categorie_produits;
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
    sql.query(`SELECT * FROM produits WHERE id_produits = ${id_produits}`, (err, res) => {
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
    });
};

/*
Produit.findByMail = (mail_Produits, result) => {
    sql.query(`SELECT * FROM produits WHERE mail = "${mail_Produits}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Produit: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};
*/

Produit.getAll = result => {
    sql.query("SELECT * FROM produits", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Produit.updateById = (id, Produit, result) => {
    sql.query(
        `UPDATE Produits SET nom_produits = ?, image_produits = ?, prix_produit = ?, categorie_produits WHERE id_produits = ${id}`,
        [Produit.nom_produits, Produit.image_produits, Produit.prix_produits, Produit.categorie_produits, id],
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