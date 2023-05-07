import React, { useState, useEffect } from "react";
import './App.css';

function DisplayImage({ imageId }) {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const response = await fetch(
          `http://localhost:8080/api/upload/files/${imageId}`
        );
        const data = await response.json();
        setImageUrl(`http://localhost:8080${data.url}`);
      } catch (error) {
        console.error(error);
      }
    }

    fetchImage();
  }, [imageId]);

  return (
      <a href={imageUrl} target="_blank">
        <img class="imageInfoAppart" src={imageUrl} alt="Uploaded file" />
      </a>
    );
}

export default DisplayImage;
