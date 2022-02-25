import React, { Component } from "react";
import { render } from "react-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
    };
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
    const file = new Blob([document.getElementById('myInput').value], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = "myFile.txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.showFile} />
        <div id="show-text">Choisir le fichier .txt</div>
        <textarea id="myInput" rows={5} />
        <button onClick={this.downloadTxtFile}>Crée un fichier .txt</button>
      </div>
    );
  }
}

export default Create;
