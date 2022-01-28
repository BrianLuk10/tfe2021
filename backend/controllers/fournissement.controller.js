const Fournissement = require("../models/fournissement.model.js");

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const fournissement = new Fournissement({
        id_produits: req.body.id_produits,
        stock_produits: req.body.stock_produits,
        date_fournissement: req.body.date_fournissement,
        exp_date: req.body.exp_date
    });

    Fournissement.create(fournissement, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the fournissement."
            });
        else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Fournissement.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving fournissement."
            });
        else
            res.send(data);
    });

};

exports.findOne = (req, res) => {
    Fournissement.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournissement with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournissement with id " + req.params.id
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

    Fournissement.updateById(
        req.params.id,
        new Fournissement(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found fournissement with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating fournissement with id " + req.params.id
                    });
                }
            } else
                res.send(data);
        }
    );
};

exports.delete = (req, res) => {
    Fournissement.remove(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournissement with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete fournissement with id " + req.params.id
                });
            }
        } else res.send({ message: `fournissement was deleted successfully!` });
    });
};

exports.findAllCommandByFournissement = (req, res) => {
    Fournissement.findAllCommandByFournissement((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving fournissement."
            });
        else
            res.send(data);
    });

};

exports.findCommandForFournissement = (req, res) => {
    Fournissement.findCommandForFournissement(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found fournissement with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving fournissement with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};