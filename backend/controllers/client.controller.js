const Client = require("../models/client.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const client = new Client({
        nom_clients: req.body.nom_clients,
        prenom_clients: req.body.prenom_clients,
        mail_clients: req.body.mail_clients,
    });

    Client.create(client, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the client."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving client."
            });
        else
        res.send(data);
    });

};

exports.findOne = (req, res) => {
    Client.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Client with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.findMail = (req, res) => {
    Client.findByMail(req.params.mail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with mail ${req.params.mail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Client with mail " + req.params.mail
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Client.updateById(
        req.params.id,
        new Client(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Client with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Client with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Client.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Client with id " + req.params.id
                });
            }
        } else res.send({ message: `Client was deleted successfully!` });
    });
};

exports.findAllCommandByClient = (req, res) => {
    Client.findAllCommandByClient((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Client."
            });
        else
            res.send(data);
    });

};

exports.findCommandForClient = (req, res) => {
    Client.findCommandForClient(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Client with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};