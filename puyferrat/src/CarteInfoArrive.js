import React from 'react';

function CarteInfoArrive({ data }) {
    console.log("on est les rat qui fait du rap", data);
    if (data === null) {
        return (<div><p>PAS D'INFORMATION</p></div>);
    }
    return (
        <div>
            <h3>INFO ARRIVE</h3>
            <p>ID: {data.id}</p>
            <p>Date: {data.attributes.date}</p>
            <p>Image rue: {data.attributes.imageRue}</p>
            <p>La porte: {data.attributes.LaPorte}</p>
            <p>BoitACle: {data.attributes.BoitACle || 'N/A'}</p>
            <p>Electricite: {data.attributes.Electricite}</p>
            <p>Eau: {data.attributes.Eau}</p>
            <p>Created at: {data.attributes.createdAt}</p>
            <p>Updated at: {data.attributes.updatedAt}</p>
            <p>Published at: {data.attributes.publishedAt}</p>
        </div>
    );
}

export default CarteInfoArrive;