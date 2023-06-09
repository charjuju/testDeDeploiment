import React, { useState } from 'react';
import fourImage from "./img/four.png";
import fourMicroOnde from "./img/four-micro-onde.png";
import litSimple from "./img/lit-simple.png";
import litDouble from "./img/lit.png";
import machineALaver from "./img/machine-a-laver.png";

function CarteLocataire({ locataire }) {
    const [editMode, setEditMode] = useState(false);
    const [informationComplemantaire, setInformationComplemantaire] = useState("");
    const [FourTraditionnel, setFourTraditionnel] = useState(null);
    const [MicroOndes, setMicroOndes] = useState(null);
    const [LitDouble, setLitDouble] = useState(null);
    const [LitSimple, setLitSimple] = useState(null);
    const [LaveLinge, setLaveLinge] = useState(null);
    
    if (!locataire) {
        return (
            <div></div>
        )
    }
    if (!locataire.attributes) {
        return (
        <div></div>
        )
    }
    if (!locataire.attributes.appartement_information_tecnique) {
        return (
            <div></div>
        )
    }
    if (!locataire.attributes.appartement_information_tecnique.data) {
        return (
            <div></div>
        )
    }

    const handleEdit = () => {
        if (!editMode) {
            setEditMode(true);
            setFourTraditionnel(locataire.attributes.appartement_information_tecnique.data.attributes.FourTraditionel );
            setMicroOndes(locataire.attributes.appartement_information_tecnique.data.attributes.microhonde);
            setLitDouble(locataire.attributes.appartement_information_tecnique.data.attributes.litDouble);
            setLitSimple(locataire.attributes.appartement_information_tecnique.data.attributes.LitSimple);
            setLaveLinge(locataire.attributes.appartement_information_tecnique.data.attributes.laveLingue);
        } else {
            setEditMode(false);
        }
    }

    const handleFourTraditionnel = () => {
        setFourTraditionnel(!FourTraditionnel);
    }
    
    const handleMicroOndes = () => {
        setMicroOndes(!MicroOndes);
    }
    
    const handleLitDouble = () => {
        setLitDouble(!LitDouble);
    }
    
    const handleLitSimple = () => {
        setLitSimple(!LitSimple);
    }
    
    const handleLaveLinge = () => {
        setLaveLinge(!LaveLinge);
    }
    const handleDelete = () => {
        const token = localStorage.getItem('token');
        const url = `https://31.34.150.223/api/appartement-information-tecniques/${locataire.attributes.appartement_information_tecnique.data.id}`;
    
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
    const saveAndPost = () => {
        if (informationComplemantaire.length > 0)
            locataire.attributes.appartement_information_tecnique.data.attributes.informationComplemantaire = informationComplemantaire;
        console.log(locataire.attributes.appartement_information_tecnique.data.attributes.informationComplemantaire);
        locataire.attributes.appartement_information_tecnique.data.attributes.microhonde = MicroOndes;
        locataire.attributes.appartement_information_tecnique.data.attributes.litDouble = LitDouble;
        locataire.attributes.appartement_information_tecnique.data.attributes.LitSimple = LitSimple;
        locataire.attributes.appartement_information_tecnique.data.attributes.FourTraditionel = FourTraditionnel;
        locataire.attributes.appartement_information_tecnique.data.attributes.laveLingue = LaveLinge;
        console.log(locataire.attributes.appartement_information_tecnique.data.id);
        const payloadData = {
            "data": {
                "informationComplemantaire": locataire.attributes.appartement_information_tecnique.data.attributes.informationComplemantaire,
                "FourTraditionel": FourTraditionnel,
                "microhonde": MicroOndes,
                "litDouble": LitDouble,
                "LitSimple": LitSimple,
                "laveLingue": LaveLinge,
            }
        }
        fetch(`https://31.34.150.223/api/appartement-information-tecniques/${locataire.attributes.appartement_information_tecnique.data.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payloadData)
      });
    }

    if (editMode) {
        return (
            <div class="etatDesLieuxConteneur">
                <div>
                    <textarea
                    placeholder={locataire.attributes.appartement_information_tecnique.data.attributes.informationComplemantaire}
                    value={informationComplemantaire} onChange={(e) => setInformationComplemantaire(e.target.value)}
                    />
                </div>
                <div>
                    <button class="invisibleButton" onClick={handleFourTraditionnel} >{FourTraditionnel ? <img class="logoImg" id="greenLight" src={fourImage}/>: <img class="logoImg" id="redLight" src={fourImage}/>}</button>
                    <button class="invisibleButton" onClick={handleMicroOndes}>{MicroOndes ? <img class="logoImg" id="greenLight" src={fourMicroOnde}/> :  <img id="redLight" class="logoImg" src={fourMicroOnde}/>}</button>
                    <button class="invisibleButton" onClick={handleLitDouble}>{LitDouble ? <img class="logoImg" id="greenLight" src={litDouble}/> :  <img id="redLight" class="logoImg" src={litDouble}/>}</button>
                    <button class="invisibleButton" onClick={handleLitSimple}>{LitSimple ? <img class="logoImg" id="greenLight" src={litSimple}/> :  <img id="redLight" class="logoImg" src={litSimple}/>}</button>
                    <button class="invisibleButton" onClick={handleLaveLinge}>{LaveLinge ? <img class="logoImg" id="greenLight" src={machineALaver}/> :  <img id="redLight" class="logoImg" src={machineALaver}/>}</button>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={handleEdit}>quiter le mode edit</button>
                    <button className="btn btn-primary" onClick={saveAndPost}>poster</button>
                </div>
            </div>
        )}
    return (
    <div className="cardEtatLieux">
        <div className="card-header">
            <h3>Fiche etat des lieux</h3>
            <h5 className="card-title">{locataire.attributes.etage} {locataire.attributes.nomLocataire} {locataire.attributes.prenomLocataire}</h5>
        </div>
        <div class="trucQuiMetAuMilieux">
            <div className="card-body">
                    <div class="informatinFicheEtatDesLieux">
                        {locataire.attributes.appartement_information_tecnique.data.attributes.FourTraditionel ? <div class="iconeEtatDesLieux"><img class="logoImg" src={fourImage}/> <p>Four Traditionel</p></div> : <img></img>}
                        {locataire.attributes.appartement_information_tecnique.data.attributes.microhonde ? <div class="iconeEtatDesLieux"><img class="logoImg" src={fourMicroOnde} /> <p>Microonde</p></div> : <img></img>}
                        {locataire.attributes.appartement_information_tecnique.data.attributes.litDouble ? <div class="iconeEtatDesLieux"><img class="logoImg" src={litDouble} /> <p>Lit double</p></div> : <img></img>}
                        {locataire.attributes.appartement_information_tecnique.data.attributes.LitSimple ? <div class="iconeEtatDesLieux"><img class="logoImg" src={litSimple} /> <p>Lit simple</p></div> : <img></img>}
                        {locataire.attributes.appartement_information_tecnique.data.attributes.laveLingue ? <div class="iconeEtatDesLieux"><img class="logoImg" src={machineALaver} /> <p>lave lingue</p></div> : <img></img>}
                    </div>
                </div>
            </div>
        <p>Information complémentaire : </p>
        <div class="marginLeftAndBottom30px">
            <p>{locataire.attributes.appartement_information_tecnique.data.attributes.informationComplemantaire}</p>
        </div>
        <div className="card-footer">
            <button class="suppreButton" onClick={handleDelete}>supprimer</button>
            <button className="btn btn-primary" onClick={handleEdit}>Modifier</button>
        </div>
            <small className="text-muted">Date de création : {locataire.attributes.createdAt}</small>
    </div>
    );
}

export default CarteLocataire;