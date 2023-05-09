import LoginPage from './LoginPage';
import NewRestaurantForm from './NewRestaurantForm';
import NewEtageForm from './NewEtageForm';
import RestaurantList from './RestaurantList';
import RestaurantRenovations from './RestaurantRenovations';
import CreerEtatDesLieux from './CreerEtatDesLieux';
import DragAndDrop from './DragAndDrop';
import CarteLocataire from './CarteLocataire';
import CarteInfoArrive from './CarteInfoArrive';
import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [varAppartement_information_tecnique, setVarAppartement_information_tecnique] = useState(null);
  const [varAppartement_information_arrive, setVarAppartement_information_arrive] = useState(null);
  const [carouselCount, setcarouselCount] = useState(1);

  const handleEtatDesLieuxButtonClick = () => {
    setcarouselCount(1);
  };

  const handleInfoArriveButtonClick = () => {
      setcarouselCount(2);
  };

  const handleInfoLocataireButtonClick = () => {
    setcarouselCount(3);
  };

  let message;
  switch (carouselCount) {
    case 1:
      message = <CarteLocataire locataire={varAppartement_information_tecnique}/>;
      break;
    case 2:
      message = <CarteInfoArrive data={varAppartement_information_arrive} />;
      break;
    case 3:
      message = <div>3</div>;
      break;
    default:
      message = 'error';
  }

  useEffect(() => {
    setSelectedRestaurantId(localStorage.getItem('restaurantselect'));
  }, []);

  const handleRestaurantSelectionChange = (newRestaurantId) => {
    setSelectedRestaurantId(newRestaurantId);
  };

  //restorant liste START
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      const response = await fetch('https://31.34.150.223/api/restaurants?_publicationState=preview');
      const data = await response.json();
      setRestaurants(data.data);
    };

    fetchRestaurants();
  }, []);

  const handleRestaurantClick = (restaurantId) => {
    console.log(localStorage.getItem("token"));
    localStorage.setItem('restaurantselect', restaurantId);
    setSelectedRestaurantId(restaurantId)
    // Do something with the restaurant ID, like opening a details page
    //window.location.reload();
  };

  const handleRestaurantSuppre = (restaurantId) => {
    //IMPORTANT PENSER A SUPPRIMER LE RESTE PASQUE LA IL RESTERA TOUJOUR LES ETAGES PERDU DANS LE NEANT DU BACK
    console.log("je supprime l'appartement:", restaurantId);
    const token = localStorage.getItem('token');
    const url = `https://31.34.150.223/api/restaurants/${restaurantId}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const [Etages, setEtages] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://31.34.150.223/api/restaurants/${selectedRestaurantId}?populate=etages`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      setEtages(data.data.attributes.etages.data);
    }
    if (selectedRestaurantId)
      fetchData();
  }, [selectedRestaurantId]);

  const handleClickSetVarAppartement_information_tecnique = async (etageId) => {
    async function fetchData() {
      const response = await fetch(
        `https://31.34.150.223/api/etages/${etageId}?populate=appartement_information_tecnique`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const datatest = await response.json();
      setVarAppartement_information_tecnique(datatest.data);
      console.log("LES INFO--->", datatest.data);
      const response2 = await fetch(
        `https://31.34.150.223/api/etages/${etageId}?populate=appartement_information_arrive`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const datatest2 = await response2.json();
      setVarAppartement_information_arrive(datatest2.data.attributes.appartement_information_arrive.data);
      console.log("LES INFO--->", datatest2.data.attributes.appartement_information_arrive.data);
    }
    fetchData();
  };

  const handleClickDelEtage = async (etageId) => {
    //IMPORTANT POUR QUE TOUT SOIT MIEUX IL FAUDRE FAIRE EN SORTE QUE çA SUPRIMME AUSSI L'ETAT DES LIEUX SI IL Y EN A UN!
    console.log("je vien de supprimer l'étage ID:", etageId);
    const token = localStorage.getItem('token');
    const url = `https://31.34.150.223/api/etages/${etageId}`;

    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  return (
    <div class="pagePrincipal">
      <div class="trucQuiMetAuMilieuxFix">
        <nav class="navbar">

            <a href="#ficheEtatDesLieux">ficheEtatDesLieux</a>
            <a href="#selection">Selection</a>
        </nav>
      </div>
      <button onClick={() => setShowLoginForm(!showLoginForm)}>
        {showLoginForm ? 'hide' : 'login'}
      </button>
      {showLoginForm ? (
        <div class="connexion-box">
          <LoginPage />
        </div>
      ) : null}
      <section class="apartementinformation">
        <section class="contenairederestaurantList">
          <div class="restorant-liste">
            <div>
              <h1>Liste des appartement</h1>
              {restaurants.map((restaurant) => (
                <div class="carteapparte">
                  <div key={restaurant.id}>
                    <h2 class="nomapparte">{restaurant.attributes.numero} {restaurant.attributes.Rue}</h2>
                    <p class="descriptionapparte">{restaurant.attributes.Description}</p>
                  </div>
                  <button onClick={() => handleRestaurantClick(restaurant.id)}>selectioner</button>
                  <button class="suppreButton" onClick={() => handleRestaurantSuppre(restaurant.id)}>supprimer</button>
                </div>
              ))}
              <NewRestaurantForm/>
            </div>
          </div>
        </section>
        <div class="Liste-des-etages">
          <h1>Liste des étages</h1>
          <ul>
            {Etages.map((etage) => (
              <div class="etage-carte">
                  <h2 class="etage-nomero">{etage.attributes.etage.toString()}</h2>
                  <h2 class="etage-nom">{etage.attributes.nomLocataire.toString()} {etage.attributes.prenomLocataire.toString()}</h2>
                  <button onClick={() => handleClickSetVarAppartement_information_tecnique(etage.id)}>selectioner</button>
                  <button class="suppreButton" onClick={() => handleClickDelEtage(etage.id)}>supprimer</button>
              </div>
            ))}
          </ul>
          <ul>
            { selectedRestaurantId ? 
              <div class="etage-carte">
                <NewEtageForm id={selectedRestaurantId}/>
              </div>
              :  
              <div></div>
            }
          </ul>
        </div>
      </section>
      <RestaurantRenovations id={selectedRestaurantId} />
      <section section id="ficheEtatDesLieux" class="trucQuiMetAuMilieux">
        <div>
          <button onClick={handleEtatDesLieuxButtonClick}>etat des lieux</button>
          <button onClick={handleInfoArriveButtonClick}>info arrivé</button>
          <button onClick={handleInfoLocataireButtonClick}>info locataire</button>
        </div>
        <div class="etatDesLieuxConteneurPagePrincipale">
          {varAppartement_information_tecnique ?
            <div>
              <div >
                {message}
              </div>
              <CreerEtatDesLieux etatDesLieuxInfo={varAppartement_information_tecnique}/>
            </div>
            : <p>pls select un truc...</p>}
        </div>
        <DragAndDrop/>
      </section>
    </div>
  );
}

export default App;
