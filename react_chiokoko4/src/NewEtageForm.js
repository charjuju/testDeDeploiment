import React, { useState } from "react";

function NewEtageForm(id) {
  const [nomLocataire, setNomLocataire] = useState("");
  const [etage, setEtage] = useState("");
  const [prenomLocataire, setPrenomLocataire] = useState("");

  async function getRestaurantData(token, id) {
    console.log(id.id);
    const response = await fetch(`http://localhost:8080/api/restaurants/${id.id}?populate=etages`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("la data reçu", data);
    return data;
  }
  

  function transformDataGetForPutCommeIlFautPourLAppartement(data) {
    console.log("le data envoyé:", data);
    const etages = data.data.attributes.etages.data.map((etage) => ({ id: etage.id }));
    return {
      data: {
        id: data.data.id,
        etages: etages
      }
    };
  }
  
  function addEtageALappartementQuIlFaut(id, data) {
    const etages = data.data.etages;
    etages.push({ id });
    return data;
  }

  function updateRestaurantData(restoId, data, token) {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    };
  
    fetch(`http://localhost:8080/api/restaurants/${restoId}`, requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error updating restaurant data');
        }
        return response.json();
      })
      .then(data => {
        console.log('Restaurant data updated:', data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      'data': {
        'nomLocataire': nomLocataire,
        'etage': etage,
        'prenomLocataire': prenomLocataire
      }
    }
    fetch("http://localhost:8080/api/etages/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        getRestaurantData(localStorage.getItem('token'), id)
          .then((restaurantData) => {
            //la c'est la ou 'est pamal complex mon pite et va faloire recupére ça plusieur foie
            const transformedData = transformDataGetForPutCommeIlFautPourLAppartement(restaurantData);
            updateRestaurantData(id.id, addEtageALappartementQuIlFaut(data.data.id, transformedData), localStorage.getItem('token'));
            window.location.reload();
          });
//        console.log("la data modifier:", transformDataGetForPutCommeIlFautPourLAppartement(getRestaurantData(localStorage.getItem('token'), id)));
        // Do something to handle success, such as redirect to success page
      })
      .catch((error) => {
        console.error("Error:", error);
        // Do something to handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <input
          placeholder="etage.porte"
          class="new-etage-input-num"
          type="number"
          value={etage}
          onChange={(e) => setEtage(e.target.value)}
        />
      <div class="new-etage-form">
        <input
          placeholder="NOM"
          class="new-etage-input"
          type="text"
          value={nomLocataire}
          onChange={(e) => setNomLocataire(e.target.value)}
        />
        <input
          placeholder="prenom"
          class="new-etage-input"
          type="text"
          value={prenomLocataire}
          onChange={(e) => setPrenomLocataire(e.target.value)}
        />
        <button type="submit">Créer un étage</button>
      </div>
    </form>
  );
}

export default NewEtageForm;
