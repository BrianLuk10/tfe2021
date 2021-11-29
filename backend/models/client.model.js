const sql = require("./db.js");

// constructor
const Client = function(client) {
    this.nom_clients = client.nom_clients;
    this.prenom_clients = client.prenom_clients;
    this.mail_clients = client.mail_clients;
};

Client.create = (newClient, result) => {
    sql.query("INSERT INTO client SET ?", newClient, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created Client: ", { id: res.insertId, ...newClient });
        result(null, { id: res.insertId, ...newClient });
    });
};

Client.findById = (id_clients, result) => {
    sql.query(`SELECT * FROM clients WHERE id_clients = ${id_clients}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Client: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Client.findByMail = (mail_clients, result) => {
    sql.query(`SELECT * FROM Clients WHERE mail_clients = "${mail_clients}"`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found Client: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null);
    });
};

Client.getAll = result => {
    sql.query("SELECT * FROM Clients", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        result(null, res);
    });
};

Client.updateById = (id, Client, result) => {
    sql.query(
        `UPDATE Clients SET nom = ?, prenom = ?, mail = ? WHERE id_clients = ${id}`,
        [Client.nom_clients, Client.prenom_clients, Client.mail_clients, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }


            console.log("updated Client: ", { id: id, ...Client });
            result(null, { id: id, ...Client });
        }
    );
};

Client.remove = (id, result) => {
    sql.query("DELETE FROM Clients WHERE id_clients = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("deleted Client with id: ", id);
        result(null, res);
    });
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


module.exports = Client;