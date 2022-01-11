import React from "react";
import axios from "axios";
import "./AjoutProduit.css";


export default class Caisse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom_produits: '',
            image_produits: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Pas_d%27image_disponible.svg/300px-Pas_d%27image_disponible.svg.png',
            prix_produits: 0.00,
            categorie_produits: 'fleur',
        }
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange(e) {
        const name = e.target.name
        this.setState({
            [name]: e.target.value
        })
    }


    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post('http://localhost:3030/produit', this.state)
            .then(response => {
                console.log(response)
            })

    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    <div className={'row-wrapper'}>
                        <div className="column-wrapper contact">
                            <h2>Produit a ajouté dans la caisse</h2>
                            <div>
                                <label htmlFor="Nom">Nom du produit :</label>
                                <input type="texte" id="nom_produits" name="nom_produits" value={this.state.nom_produits} onChange={this.handleChange}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="Lien">Lien URL de l'image :</label>
                                <input type="texte" id="image_produits" name="image_produits" value={this.state.image_produits}
                                    onChange={this.handleChange} required />
                            </div>
                            <div>
                                <label htmlFor="Prix">Prix :</label>
                                <input type="number" min="0" id="prix_produits" name="prix_produits" value={this.state.prix_produits} onChange={this.handleChange}
                                    required />
                            </div>
                            <div>
                                <label htmlFor="Cat">categorie :</label>
                                <select id="categorie_produits" name="categorie_produits" value={this.state.categorie_produits} onChange={this.handleChange}>
                                    <option value="fleur">fleur</option>
                                    <option value="consommable">consommable</option>
                                    <option value="décoration">décoration</option>
                                </select>

                            </div>
                            <div className="confirmer">
                                <button className='btn btn-primary' type="submit" id='sub' name='sub'>S'inscrire</button>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}