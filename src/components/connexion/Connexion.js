import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Connexion.scss";

/**
 * fonction asynchrone permet de d'envoyer le token de la connexion actuelle
 * @param {*} credentials
 * @returns  {Promise<Object>}
 */
async function loginUser(credentials) {
  return fetch("http://localhost:3030/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}
/**
 *
 * @param {string} setToken
 * @returns {html}
 */
export default function Connexion({ setToken }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  /**
   * hardcodage nom utilisateur et mot de passe TFE "test"
   * @param e
   */
  const handleSubmit = async (e) => {
    if (username == "test" && password == "test") {
      e.preventDefault();
      const token = await loginUser({
        username,
        password,
      });
      setToken(token);
    } else {
      console.log("incorrecte");
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit}>
        <label>
          <p>Nom d'utilisateur</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Mot de passe</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" className="test">
            Valider
          </button>
        </div>
      </form>
    </div>
  );
}

Connexion.propTypes = {
  setToken: PropTypes.func.isRequired,
};
