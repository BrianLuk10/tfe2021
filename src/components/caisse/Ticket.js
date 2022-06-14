import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import axios from "axios";

let prixTotal = 0;

/**
 * fonction pour calculer le total des prix de la commande
 * @param {number} a
 * @param {number} b
 */
function calculerPrixTotal(a, b) {
  let prix = a * b;
  prixTotal += prix;
}
/**
 * fonction affichage de la page de ticket de caisse
 * @returns {React.ReactElement} page du ticket
 */
function Ticket() {
  let articleShow;
  let posts;

  useEffect(() => {}, []);

  let componentRef = useRef(null);
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;

  let data = JSON.parse(sessionStorage.getItem("save"));
  sessionStorage.setItem("caisse", JSON.stringify(data));
  let article = JSON.parse(sessionStorage.getItem("save"));
  let i = 0;
  let numeroCommande = sessionStorage.getItem("numero");

  try {
    posts = article.map((obj) => ({
      articleId: i++,
      id: obj.id,
      nom: obj.nom,
      prix: obj.prix,
      nombre: obj.nombre,
    }));
    articleShow = posts.map((pd) => (
      <tr>
        {calculerPrixTotal(pd.prix, pd.nombre)}
        <td>{pd.nombre}</td>
        <td>{pd.nom}</td>
        <td>{pd.prix}€</td>
        <td></td>
        <td>{pd.prix * pd.nombre}€</td>
      </tr>
    ));
  } catch {
    console.log("pas d'article");
  }

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <button class="btn">
            <img
              src="https://icon-library.com/images/print-page-icon/print-page-icon-5.jpg"
              width={25}
              height={25}
            ></img>
          </button>
        )}
        content={() => componentRef}
      />
      <div ref={(el) => (componentRef = el)}>
        <div>
          <h2>FLEUR RÉMA</h2>
          <div>18 rue Saint Jean 1370 Jodoigne</div>
          <div>010.81.24.85</div>
          <div>0498.80.01.02</div>
          <div>{date}</div>
          <div>Numéro de caisse : {numeroCommande}</div>
        </div>
        <table>
          <tr>
            <th>Qté</th>
            <th>Article</th>
            <th>Prix unitaire</th>
            <th></th>
            <th>Prix</th>
          </tr>
          {articleShow}
          <hr></hr>
          <tr>
            <th>HTVA</th>
            <th>TAUX</th>
            <th></th>
            <th>TVA</th>
            <th></th>
            <th>TOTAL</th>
          </tr>
          <tr>
            <td>6.60€</td>
            <td>6.00</td>
            <td></td>
            <td>0.40€</td>
            <td></td>
            <td>{prixTotal}€</td>
          </tr>
          <div>TOTAL : {prixTotal}€</div>
          <div>MERCI ET AU REVOIR</div>
          <div>BEDANKT EN TOT ZIENS</div>
        </table>
      </div>
    </div>
  );
}

export default Ticket;
