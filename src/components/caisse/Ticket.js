import React, { useEffect, useRef, useState } from "react";
import ReactToPrint from "react-to-print";

let prixTotal = 0;
function calculerPrixTotal(a, b) {
  let prix = a * b;
  prixTotal += prix;
}

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
  for (let j = 0; j < data.length; j++) {
    console.log("les données numero " + j + " sont :");
    console.log(data[j]);
  }
  sessionStorage.setItem("caisse", JSON.stringify(data));
  let article = JSON.parse(sessionStorage.getItem("save"));
  let i = 0;
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
        <td>{date}</td>
        <td>{pd.nombre}</td>
        <td>{pd.nom}</td>
        <td></td>
        <td>{pd.prix * pd.nombre}€</td>
      </tr>
    ));
  } catch {
    console.log("pas d'article");
  }

  console.log(articleShow);
  console.log(posts);

  return (
    <div>
      <ReactToPrint
        trigger={() => (
          <div>
            <button>print</button>
          </div>
        )}
        content={() => componentRef}
      />
      <div ref={(el) => (componentRef = el)}>
        <div>
          <h2>FLEUR RÉMA</h2>
          <div>18 rue Saint Jean 1370 Jodoigne</div>
          <div>010.81.24.85</div>
          <div>0498.80.01.02</div>
        </div>
        <table>
          <tr>
            <th>Date</th>
            <th>Qté</th>
            <th>Article</th>
            <th></th>
            <th>Prix</th>
          </tr>
          {articleShow}
          <hr></hr>
          <tr>
            <th>TOTAL</th>
          </tr>
          <tr>
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
