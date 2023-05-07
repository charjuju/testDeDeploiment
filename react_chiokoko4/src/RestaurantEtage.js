import React, { useState, useEffect } from "react";

function RestaurantEtage({ id }) {
  const [Etages, setEtages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:8080/api/restaurants/${id}?populate=etages`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      setEtages(data.data.attributes.etages.data);
    }
    fetchData();
  }, [id]);

    const GetInfoButton = () => {
      console.log('caca');
    }
    

  return (
    <div>
      <h2>etage de l'appart: {id}</h2>
      <ul>
        {Etages.map((etage) => (
          <div class="etage-carte">
              <p class="etage-nom">{etage.attributes.nomLocataire.toString()} {etage.attributes.prenomLocataire.toString()}</p>
              <p class="etage-nomero">{etage.attributes.etage.toString()}</p>
              <button onClick={GetInfoButton}>YES</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantEtage;
