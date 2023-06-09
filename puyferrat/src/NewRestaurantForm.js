import React, { useState } from "react";

import './index.css';

function NewRestaurantForm() {
  const [Rue, setRue] = useState("");
  const [description, setDescription] = useState("");
  const [Numero, setNumero] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
        'data': {
            'Rue': Rue,
            'Description': description,
            'numero': Numero
        }
    }
    fetch("https://31.34.150.223/api/restaurants", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // Do something to handle success, such as redirect to success page
      })
      .catch((error) => {
        console.error("Error:", error);
        // Do something to handle error
      });
  };

  return (
    <form onSubmit={handleSubmit}>
        <div class="carteapparte">
            <label class="new-restaurant-label">
            </label>
            <div class="new-restaurant-input-nom">
              <input class="new-restaurant-input-numero" type="number" value={Numero} onChange={(e) => setNumero(e.target.value)} placeholder="NUM"/>
              <input class="new-restaurant-input-rue" type="text" value={Rue} onChange={(e) => setRue(e.target.value)} placeholder="RUE"/>
            </div>
            <div>
              <textarea class="new-restaurant-text-area" value={description} onChange={(e) => setDescription(e.target.value)} />
              <button type="submit">MAKE</button>
            </div>
        </div>
    </form>
  );
}

export default NewRestaurantForm;
