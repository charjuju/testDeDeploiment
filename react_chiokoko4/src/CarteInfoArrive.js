import React, { useState } from 'react';
import DisplayImage from "./DisplayImage";
import DragAndDrop from './DragAndDrop';
import RichText from './RichText';

function CarteInfoArrive({ data }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState(data);
    const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedData((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [name]: value,
      },
    }));
};

const handleSubmit = (event) => {
    event.preventDefault();
    // Appeler une fonction de mise à jour des données avec editedData
};
    const handleClick = () => {
        console.log("LOGGGG");
        const payloadData = {
            "data": {
                "date": editedData.attributes.date,
                "Titre": editedData.attributes.Titre,
                "Caracteristique": editedData.attributes.Caracteristique,
                "LesPlus": editedData.attributes.LesPlus,
                "linkCoca": editedData.attributes.linkCoca,
            }
        }
        fetch(`http://localhost:8080/api/appartement-information-arrives/${editedData.id}`, {
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
                data.attributes = editedData.attributes;
            } else {
                console.error('La requête a échoué.');
            }
        })
        .catch(error => {
          console.error('La requête a échoué :', error);
        });
    };
if (data === null) {
    return <div><p>PAS D'INFORMATION</p></div>;
}

  if (isEditing) {
    return (
    <form onSubmit={handleSubmit}>
        <h3>MODIFIER INFO ARRIVE</h3>
        <div class="inputInfoarrive">
              <h3 class="justPrimaryColor">Date:</h3>
            <label>
              <input
                type="text"
                name="date"
                value={editedData.attributes.date}
                onChange={handleInputChange}
                />
            </label>
        </div>
        <div class="inputInfoarrive">
            <h3 class="justPrimaryColor">Titre:</h3>
            <label>
              <textarea
                type="text"
                name="Titre"
                value={editedData.attributes.Titre}
                onChange={handleInputChange}
                />
            </label>
        </div>
        <div class="inputInfoarrive">
            <h3 class="justPrimaryColor">Caracteristique:</h3>
            <label>
              <textarea
                type="text"
                name="Caracteristique"
                value={editedData.attributes.Caracteristique}
                onChange={handleInputChange}
                />
            </label>
        </div>
        <div class="inputInfoarrive">
            <h3 class="justPrimaryColor">LesPlus:</h3>
            <label>
              <textarea
                type="text"
                name="LesPlus"
                value={editedData.attributes.LesPlus}
                onChange={handleInputChange}
                />
            </label>
        </div>
        <div class="inputInfoarrive">
            <h3 class="justPrimaryColor">linkCoca:</h3>
            <label>
              <input
                type="text"
                name="linkCoca"
                value={editedData.attributes.linkCoca}
                onChange={handleInputChange}
                />
            </label>
        </div>
        <label>
          Image rue:
        <DragAndDrop urlText="http://localhost:8080/api/appartement-information-arrives/" id={editedData.id} dataTuch="imageRue"/>
        </label>
        <label>
            La porte:
            <DragAndDrop urlText="http://localhost:8080/api/appartement-information-arrives/" id={editedData.id} dataTuch="LaPorte"/>
        </label>
        <label>
            BoitACle:
            <DragAndDrop urlText="http://localhost:8080/api/appartement-information-arrives/" id={editedData.id} dataTuch="BoitACle"/>
        </label>
        <label>
            Electricite:
            <DragAndDrop urlText="http://localhost:8080/api/appartement-information-arrives/" id={editedData.id} dataTuch="Electricite"/>
        </label>
        <label>
            Eau:
            <DragAndDrop urlText="http://localhost:8080/api/appartement-information-arrives/" id={editedData.id} dataTuch="Eau"/>
        </label>
        <button type="submit" onClick={handleClick}>Sauvegarder</button>
        <button onClick={() => setIsEditing(false)}>quiter</button>
    </form>
    );
}
  console.log(data);
  return (
    <div class="BackBlack">
        <div class="infoariverHeder">
            <h2>INFO ARRIVE</h2>
            <h2>Date: {data.attributes.date}</h2>
        </div>
            <div class="titreInfoArive">
                <h3>TITRE</h3>
            </div>
            <div class="informationArriveInfoDinfo">
                <RichText content={data.attributes.Titre} />
            </div>
        <div class="photo-gridInfoArrive">
            <div class="photoInfoArrive">
                <DisplayImage imageId={data.attributes.imageRue}/>
            </div>
            <div class="photoInfoArrive">
                <DisplayImage imageId={data.attributes.LaPorte}/>
            </div>
            <div class="photoInfoArrive">
                <DisplayImage imageId={data.attributes.BoitACle}/>
            </div>
            <div class="photoInfoArrive">
                <DisplayImage imageId={data.attributes.Electricite}/>
            </div>
            <div class="photoInfoArrive">
                <DisplayImage imageId={data.attributes.Eau}/>
            </div>
        </div>
        <div class="caracteristiqueInfoArive">
            <div class="titreInfoArive">
                <h3>Caracteristique:</h3>
            </div>
            <div class="informationArriveInfoDinfo">
                <RichText content={data.attributes.Caracteristique} />
            </div>
        </div>
        <div class="lesPlusInfoArive">
            <div class="titreInfoArive">
                <h3>LesPlus:</h3>
            </div>
            <div class="informationArriveInfoDinfo">
                <RichText content={data.attributes.LesPlus} />
            </div>
            
        </div>
        <a href={data.attributes.linkCoca}>
                <div class="cocalinkDiv">
                <p>voir l'apartement en 3D:</p>
                <div class="linkCocaInfoArive">
                {
                    data.attributes.linkCoca ?
                    <div>
                    </div>
                    : <p>Pas d'information</p>
                }
                    <p>{data.attributes.linkCoca}</p>
                </div>
            </div>
        </a>
        <button onClick={() => setIsEditing(true)}>Modifier</button>
        <div class="infoariverFooter">
            <p>Created at: {data.attributes.createdAt}</p>
            <p>Updated at: {data.attributes.updatedAt}</p>
            <p>Published at: {data.attributes.publishedAt}</p>
        </div>
    </div>
    );
}

export default CarteInfoArrive;
