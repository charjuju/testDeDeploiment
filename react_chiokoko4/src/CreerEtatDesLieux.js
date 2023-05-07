import React, { useState } from 'react';

function CreerEtatDesLieux({ etatDesLieuxInfo }) {
    const [etatDesLieuxCree, setEtatDesLieuxCree] = useState(false);
    if (!etatDesLieuxInfo) {
        return (<div><p>a Dautre stp</p></div>);
    }
    if (etatDesLieuxInfo.attributes.appartement_information_tecnique.data)
        return (<div></div>);
    const handleCreerEtatDesLieux = async () => {
    try {
      // Créer une nouvelle appartement_information_technique
      const responsePost = await fetch('http://localhost:8080/api/appartement-information-tecniques', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          data: {
            informationComplemantaire: "non",
            FourTraditionel: true,
            microhonde: false,
            litDouble: true,
            LitSimple: false,
            laveLingue: false
          }
        })
      });
      //creation des info D'arrivé
      const responsePostarrive = await fetch('http://localhost:8080/api/appartement-information-arrives', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          data: {
          }
        })
      });

      if (!responsePostarrive.ok) {
        throw new Error('Erreur lors de la création de l\'appartement_information_technique.');
      }
      if (!responsePost.ok) {
        throw new Error('Erreur lors de la création de l\'appartement_information_technique.');
      }
      const dataInfoArrive = await responsePostarrive.json();
      const idAppartement_information_tecniqueInfoArrive = dataInfoArrive.data.id;
      const data = await responsePost.json();
      const idAppartement_information_tecnique = data.data.id;

      // Joindre l'appartement_information_technique à l'étage
      const responsePut = await fetch(`http://localhost:8080/api/etages/${etatDesLieuxInfo.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          data: {
            appartement_information_tecnique: {
              id: idAppartement_information_tecnique
            },
            appartement_information_arrive: {
              id: idAppartement_information_tecniqueInfoArrive
            }
          }
        })
      });

      if (!responsePut.ok) {
        throw new Error('Erreur lors de la jointure de l\'appartement_information_technique à l\'étage.');
      }

      setEtatDesLieuxCree(true);
    } catch (error) {
      console.error(error);
    }
    window.location.reload();
  }

  return (
    <div>
      {!etatDesLieuxCree ? (
        <button onClick={handleCreerEtatDesLieux}>Créer état des lieux</button>
      ) : (
        <p>État des lieux créé avec succès !</p>
      )}
    </div>
  );
}

export default CreerEtatDesLieux;
