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
import DisplayImage from "./DisplayImage";
import ConfirmationPopup from "./ConfirmationPopup"

import './App.css';

function App() {
  	const [showLoginForm, setShowLoginForm] = useState(false);
  	const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  	const [varAppartement_information_tecnique, setVarAppartement_information_tecnique] = useState(null);
  	const [varAppartement_information_arrive, setVarAppartement_information_arrive] = useState(null);
  	const [carouselCount, setcarouselCount] = useState(1);
  	const [Etages, setEtages] = useState([]);

	const [appartementEditeMode, setAppartementEditeMode] = useState(false);
	const [appartementSelectionerEdit, setAppartementSelectinerEdit] = useState(-1);
	const [appartementSelectionerEditID, setAppartementSelectinerEditID] = useState(-1);

	const [etagesEditeMode, setEtagesEditeMode] = useState(false);
	const [etagesSelectionerEdit, setEtagesSelectinerEdit] = useState(-1);
	const [etagesSelectionerEditID, setEtagesSelectinerEditID] = useState(-1);

	const [showPopUpSuppre, setShowPopUpSuppre] = useState(false);

	  //restorant liste START
	const [restaurants, setRestaurants] = useState([]);

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

  	useEffect(() => {
		  const fetchRestaurants = async () => {
			if (restaurants.length === 0) {
    	  		const response = await fetch('http://localhost:8080/api/restaurants?_publicationState=preview');
    	  		const data = await response.json();
    	  		setRestaurants(data.data);
				console.log("HUMMMM");
			}
    	};

    fetchRestaurants();
  	}, []);

  	const handleRestaurantClick = (restaurantId) => {
  	  	localStorage.setItem('restaurantselect', restaurantId);
  	  	setSelectedRestaurantId(restaurantId)
  	  	// Do something with the restaurant ID, like opening a details page
  	  	//window.location.reload();
  	};

  	const handleRestaurantSuppre = (restaurantId) => {
		if (!showPopUpSuppre) {
			setShowPopUpSuppre(true);
			return;
		}
    	//IMPORTANT PENSER A SUPPRIMER LE RESTE PASQUE LA IL RESTERA TOUJOUR LES ETAGES PERDU DANS LE NEANT DU BACK
    	console.log("je supprime l'appartement:", restaurantId);
    	const token = localStorage.getItem('token');
    	const url = `http://localhost:8080/api/restaurants/${restaurantId}`;

    	fetch(url, {
    	  	method: 'DELETE',
    	  	headers: {
    	  	  'Content-Type': 'application/json',
    	  	  Authorization: `Bearer ${token}`,
    	  	},
    	})
    	.then((response) => response.json())
    	.then((data) => {
    	  	console.log(data)
    	  	window.location.reload();
    	  	})
    	.catch((error) => console.log(error));
  	};

	useEffect(() => {
	    async function fetchData() {
	      	const response = await fetch(
	        	`http://localhost:8080/api/restaurants/${selectedRestaurantId}?populate=etages`,
	        	{
	        	  	headers: {
	        	    	Authorization: `Bearer ${localStorage.getItem('token')}`,
	        	  	},
	        	}
	      	);
	      	const data = await response.json();
	      	setEtages(data.data.attributes.etages.data);
	    }
	    if (selectedRestaurantId) {
	      	fetchData();
		}
	}, [selectedRestaurantId]);

	const handleClickSetVarAppartement_information_tecnique = async (etageId) => {
	    async function fetchData() {
	    	const response = await fetch(
				`http://localhost:8080/api/etages/${etageId}?populate=appartement_information_tecnique`,
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
				`http://localhost:8080/api/etages/${etageId}?populate=appartement_information_arrive`,
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
		if (!showPopUpSuppre) {
			setShowPopUpSuppre(true);
			return;
		}
		//IMPORTANT POUR QUE TOUT SOIT MIEUX IL FAUDRE FAIRE EN SORTE QUE çA SUPRIMME AUSSI L'ETAT DES LIEUX SI IL Y EN A UN!
	    console.log("je vien de supprimer l'étage ID:", etageId);
	    const token = localStorage.getItem('token');
	    const url = `http://localhost:8080/api/etages/${etageId}`;

	    fetch(url, {
	      	method: 'DELETE',
	      	headers: {
	      	  	'Content-Type': 'application/json',
	      	  	Authorization: `Bearer ${token}`,
	      	},
	    })
	      	.then((response) => response.json())
	      	.then((data) => {
				console.log(data)
				window.location.reload();
			})
	      	.catch((error) => console.log(error));
	};

	function handleClickSelectionDAppartementEdit(index, restaurantId) {
		setAppartementEditeMode(true);
		setAppartementSelectinerEdit(index);
		console.log("edit", restaurantId, "index = ", index);
		setAppartementSelectinerEditID(restaurantId);
	}

	function handleClickSelectionDEtageEdit(index, etageIdpourEtreUniquePasqueYEEEEEEEEEEE) {
		setEtagesEditeMode(true);
		setEtagesSelectinerEdit(index);
		console.log("edit", etageIdpourEtreUniquePasqueYEEEEEEEEEEE, "index = ", index);
		setEtagesSelectinerEditID(etageIdpourEtreUniquePasqueYEEEEEEEEEEE);
	}

	function handleClickPostAppartementEdit() {
		const payloadData = {
            "data": {
				"Description": restaurants[appartementSelectionerEdit].attributes.Description,
        		"Rue": restaurants[appartementSelectionerEdit].attributes.Rue,
        		"numero": restaurants[appartementSelectionerEdit].attributes.numero
            }
        }
		fetch(`http://localhost:8080/api/restaurants/${appartementSelectionerEditID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payloadData)
        })
        .then(response => {
            if (response.ok) {
                console.log('La requête a réussi !');
				console.log("c'est sovgarder");
				setAppartementEditeMode(false);
            } else {
                console.error('La requête a échoué.');
            }
        })
        .catch(error => {
          console.error('La requête a échoué :', error);
        });
	}

	function handleClickPostEtagesEdit() {
		const payloadData = {
            "data": {
				"nomLocataire": Etages[etagesSelectionerEdit].attributes.nomLocataire,
        		"etage": Etages[etagesSelectionerEdit].attributes.etage,
        		"prenomLocataire": Etages[etagesSelectionerEdit].attributes.prenomLocataire
            }
        }
		fetch(`http://localhost:8080/api/etages/${etagesSelectionerEditID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(payloadData)
        })
        .then(response => {
            if (response.ok) {
                console.log('La requête a réussi !');
				console.log("c'est sovgarder");
				setAppartementEditeMode(false);
            } else {
                console.error('La requête a échoué.');
            }
        })
        .catch(error => {
          console.error('La requête a échoué :', error);
        });
	}

	const cancelDelete = () => {
		setShowPopUpSuppre(false);
		console.log("Suppression annulée");
	};

	return (
	    <div class="pagePrincipal">
			{showPopUpSuppre && <ConfirmationPopup onCancel={cancelDelete}/>}

			{appartementEditeMode && appartementSelectionerEdit >= 0 && appartementSelectionerEdit < restaurants.length &&
				<div class="edit-appartement">
					<div class="fond-gris" onClick={() => setAppartementEditeMode(false)}></div>
						<div class="modifier-page">
							<h2>EDITE APARTEMENT</h2>
							<label class="modifier-page-label">
                  				<strong>Rue</strong>
                  				<input type="text" value={restaurants[appartementSelectionerEdit].attributes.Rue} onChange={(e) => {
                    				const newRestaurants = [...restaurants];
                    				newRestaurants[appartementSelectionerEdit].attributes.Rue = e.target.value;
                    				setRestaurants(newRestaurants);
                  				}} />
                			</label>
							<label class="modifier-page-label">
                  				<strong>Numero</strong>
                  				<input type="number" value={restaurants[appartementSelectionerEdit].attributes.numero} onChange={(e) => {
                    				const newRestaurants = [...restaurants];
                    				newRestaurants[appartementSelectionerEdit].attributes.numero = e.target.value;
                    				setRestaurants(newRestaurants);
                  				}} />
                			</label>
							<label class="modifier-page-label">
                  				<strong>Description</strong>
                  				<input type="text" value={restaurants[appartementSelectionerEdit].attributes.Description} onChange={(e) => {
                    				const newRestaurants = [...restaurants];
                    				newRestaurants[appartementSelectionerEdit].attributes.Description = e.target.value;
                    				setRestaurants(newRestaurants);
                  				}} />
                			</label>
							<button data-cy='buttonSelectAppart' onClick={() => handleClickPostAppartementEdit()}>sovgarder</button>
						</div>
				</div>
			}


			{etagesEditeMode && etagesSelectionerEdit >= 0 && etagesSelectionerEdit < Etages.length &&
				<div class="edit-appartement">
					<div class="fond-gris" onClick={() => setEtagesEditeMode(false)}></div>
						<div class="modifier-page">
							<h2>EDITE ETAGES</h2>
							<label class="modifier-page-label">
                  				<strong>etage</strong>
                  				<input type="number" value={Etages[etagesSelectionerEdit].attributes.etage} onChange={(e) => {
                    				const newEtages = [...Etages];
                    				newEtages[etagesSelectionerEdit].attributes.etage = e.target.value;
                    				setEtages(newEtages);
                  				}} />
                			</label>
							<label class="modifier-page-label">
                  				<strong>Nom du Locataire</strong>
                  				<input type="text" value={Etages[etagesSelectionerEdit].attributes.nomLocataire} onChange={(e) => {
                    				const newEtages = [...Etages];
                    				newEtages[etagesSelectionerEdit].attributes.nomLocataire = e.target.value;
                    				setEtages(newEtages);
                  				}} />
                			</label>
							<label class="modifier-page-label">
                  				<strong>Prenom Locataire</strong>
                  				<input type="text" value={Etages[etagesSelectionerEdit].attributes.prenomLocataire} onChange={(e) => {
                    				const newEtages = [...Etages];
                    				newEtages[etagesSelectionerEdit].attributes.prenomLocataire = e.target.value;
                    				setEtages(newEtages);
                  				}} />
                			</label>
							<button data-cy='buttonSelectAppart' onClick={() => handleClickPostEtagesEdit()}>sovgarder</button>
						</div>
				</div>
			}


	      	<div class="trucQuiMetAuMilieuxFix">
	        	<nav class="navbar">
	        	    <a href="#ficheEtatDesLieux">ficheEtatDesLieux</a>
	        	    <a href="#selection">Selection</a>
	        	</nav>
	      	</div>
	      	<button data-cy="bouttonLogin" onClick={() => setShowLoginForm(!showLoginForm)}>
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
	            	  	{restaurants.map((restaurant, index) => (
	            	    	<div data-cy="divRestorant" class="carteapparte">
	            	    	  	<div key={restaurant.id}>
	            	    	    	<h2 data-cy="nomDesRestorant" class="nomapparte">{restaurant.attributes.numero} {restaurant.attributes.Rue}</h2>
	            	    	    	<p class="descriptionapparte">{restaurant.attributes.Description}</p>
	            	    	  	</div>
	            	    	  	<button data-cy='buttonSelectAppart' onClick={() => handleRestaurantClick(restaurant.id)}>selectioner</button>
	            	    	  	<button data-cy='buttonSuppreResto' class="suppreButton" onClick={() => handleRestaurantSuppre(restaurant.id)}>supprimer</button>
	            	    	  	<button data-cy='buttonSuppreResto' class="suppreButton" onClick={() => handleClickSelectionDAppartementEdit(index, restaurant.id)}>edit</button>
	            	    	</div>
	            	  	))}
	            	  	<NewRestaurantForm/>
	            	</div>
	          	</div>
	        </section>
	        <div class="Liste-des-etages">
	          	<h1>Liste des étages</h1>
	          	<ul>
	            	{Etages.map((etage, index) => (
	            	  	<div class="etage-carte">
	            	      	<h2 class="etage-nomero">{etage.attributes.etage.toString()}</h2>
	            	      	<h2 class="etage-nom">{etage.attributes.nomLocataire.toString()} {etage.attributes.prenomLocataire.toString()}</h2>
	            	      	<button data-cy='buttonSelectionerEtage' onClick={() => handleClickSetVarAppartement_information_tecnique(etage.id)}>selectioner</button>
	            	      	<button class="suppreButton" onClick={() => handleClickDelEtage(etage.id)}>supprimer</button>
							<button data-cy='buttonSuppreResto' class="suppreButton" onClick={() => handleClickSelectionDEtageEdit(index, etage.id)}>edit</button>
	            	  	</div>
	            	))}
	          	</ul>
	          	<ul>
	            	{ selectedRestaurantId ? 
	            	  	<div data-cy='makeEtage' class="etage-carte">
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
	        	  	{
						varAppartement_information_tecnique ?
	        	  		  	<div>
	        	  		    	<div>
	        	  		    	  	{message}
	        	  		    	</div>
	        	  		    	<CreerEtatDesLieux etatDesLieuxInfo={varAppartement_information_tecnique}/>
	        	  		  	</div>
	        	  		  	: 
						<p>pls select un truc...</p>
					}
	        	</div>
	      	</section>
	    </div>
	);
}

export default App;
