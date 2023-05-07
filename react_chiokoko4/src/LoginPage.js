import React, { useState } from 'react';

import './index.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/local', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          identifier: email,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        setError('Conextion réussit');
//        window.location.href = '/LoginSuccess'; // redirigez vers la page de sucssé
      } else {
        setError('Mauvais email ou mot de passe.');
      }
    } catch (error) {
      console.error(error);
      setError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setError('Déconnexion réussie');
  };

  return (
    <div>
          <h1>Connexion</h1>
          <form onSubmit={handleSubmit}>
              <div>
                  <label htmlFor="email" class="connexion-label" >Email</label>
                  <input data-cy="emailLogin" class="connexion-input" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div>
                  <label htmlFor="password" class="connexion-label">Mot de passe</label>
                  <input data-cy="loginLogin" class="connexion-input" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button data-cy="seConecterLogin" type="submit" class="connexion-bouton">Se connecter</button>
          </form>
        {error && <p data-cy="errorLogin">{error}</p>}
        {localStorage.getItem('token') && <button onClick={handleLogout} class="deconnexion-bouton">Se déconnecter</button>}
    </div>
  );
}

export default LoginPage;