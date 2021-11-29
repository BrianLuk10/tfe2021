const Produit = require("../models/produit.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const produit = new Produit({
        nom_produit: req.body.nom_produit,
        image_produit: req.body.image_produit,
        prix_produit: req.body.prix_produit,
    });

    Produit.create(produit, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the produit."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Produit.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving produit."
            });
        else
        res.send(data);
    });

};

exports.findOne = (req, res) => {
    Produit.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produit with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving produit with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

/*
exports.findMail = (req, res) => {
    Produit.findByMail(req.params.mail, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produit with mail ${req.params.mail}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving produit with mail " + req.params.mail
                });
            }
        } else res.send(data);
    });
};
*/

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Produit.updateById(
        req.params.id,
        new Produit(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found produit with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating produit with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Produit.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produit with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete produit with id " + req.params.id
                });
            }
        } else res.send({ message: `produit was deleted successfully!` });
    });
};

exports.findAllCommandByProduit = (req, res) => {
    Produit.findAllCommandByProduit((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving produit."
            });
        else
            res.send(data);
    });

};

exports.findCommandForProduit = (req, res) => {
    Produit.findCommandForProduit(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found produit with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving produit with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};