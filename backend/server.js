const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3030",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Bienvenue dans l'API fleuriste.");
});

app.use("/token", (req, res) => {
  res.send({
    token: "ymdC1VG8lMNfqaEZ0lI7puDg8vw",
  });
});

require("./routes/client.route.js")(app);
require("./routes/produit.route.js")(app);
require("./routes/fournissement.route.js")(app);
require("./routes/historique.route.js")(app);
require("./routes/commande.route.js")(app);
require("./routes/commande2.route.js")(app);
require("./routes/fournissement2.route.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
