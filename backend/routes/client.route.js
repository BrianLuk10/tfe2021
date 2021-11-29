module.exports = app => {
    const client = require("../controllers/client.controller.js");

    app.post("/client", client.create);

    app.get("/client", client.findAll);

    app.get("/client/:id", client.findOne);

    app.get("/mail/:mail", client.findMail);

    app.put("/client/:id", client.update);

    app.delete("/client/:id", client.delete);

};