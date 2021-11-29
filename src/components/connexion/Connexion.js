import React, { useState } from 'react';
import PropTypes from "prop-types"
import "./Connexion.scss";

async function loginUser(credentials) {
  return fetch('http://localhost:3030/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
 }
export default function Connexion({setToken}) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    if(username == "test" && password == "test"){
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }
  else {
    alert('incorrecte');
  }
}

  return(
    <div className="login-wrapper">
    <h1>Please Log In</h1>
    <form onSubmit={handleSubmit}>
    <label>
      <p>Username</p>
      <input type="text" onChange={e => setUserName(e.target.value)} />
    </label>
    <label>
      <p>Password</p>
      <input type="password" onChange={e => setPassword(e.target.value)} />
    </label>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
  </div>
  );
}

Connexion.propTypes = {
  setToken: PropTypes.func.isRequired
}