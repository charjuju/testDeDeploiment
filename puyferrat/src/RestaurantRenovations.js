import React, { useState, useEffect } from "react";

function RestaurantRenovations({ id }) {
  const [renovations, setRenovations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://31.34.150.223/api/restaurants/${id}?populate=renovations`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      const data = await response.json();
      setRenovations(data.data.attributes.renovations.data);
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
      <ul>
        {renovations.map((renovation) => (
          <li key={renovation.id}> 
            <p>Cafard: {renovation.attributes.cafard.toString()}</p>
            <p>Souris: {renovation.attributes.souris.toString()}</p>
            <p>Aux normes: {renovation.attributes.auxnormes.toString()}</p>
            <p>Travaux: {renovation.attributes.travaux.toString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RestaurantRenovations;
