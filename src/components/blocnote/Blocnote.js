import React, { Component } from "react";
import { render } from "react-dom";
import axios from "axios";

class Blocnote extends Component {
  constructor() {
    super();
    this.state = {
      text: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:3030/produit5").then((res) => {
      const data = res.data;
      const posts = data.map((obj) => ({
        id: obj.id_produits,
        nom: obj.nom_produits,
        prix: obj.prix_produits,
        categorie: obj.categorie_produits,
        image: obj.image_produits,
        stock: obj.stock,
      }));
      const postData = posts.map((pd) => `${pd.nom} stock : ${pd.stock} \n`);
      this.setState({
        text: postData,
      });
    });
  }

  showFile = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      var preview = document.getElementById("show-text");
      var file = document.querySelector("input[type=file]").files[0];
      var reader = new FileReader();

      var textFile = /text.*/;

      if (file.type.match(textFile)) {
        reader.onload = function (event) {
          preview.innerHTML = event.target.result;
        };
      } else {
        preview.innerHTML = "<span class='error'>No file!</span>";
      }
      reader.readAsText(file);
    } else {
      alert("Error!");
    }
  };

  downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([document.getElementById("myInput").value], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };

  render() {
    return (
      <div>
        <input type="file" onChange={this.showFile} />
        <div id="show-text">Choisir le fichier .txt</div>
        <textarea
          id="myInput"
          rows={5}
          cols={75}
          defaultValue={this.state.text}
        />
        <button onClick={this.downloadTxtFile}>Crée un fichier .txt</button>
      </div>
    );
  }
}

export default Blocnote;
