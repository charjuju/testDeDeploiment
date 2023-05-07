import React, { useState } from 'react';

function DragAndDrop({ urlText, id, dataTuch}) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewSrc, setPreviewSrc] = useState('');
  
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    const formData = new FormData();
    formData.append('files', file, "imageTest.png");
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewSrc(reader.result);
    };
    console.log("OKEEEEEEEEE");
    fetch('http://localhost:8080/api/upload/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      console.log(data);
      const imageId = data[0].id;
      console.log('ID de l\'image :', imageId);
      // YEEEEEEEEEE lieson de limage au truc
      const payloadData = {
        "data": {
          [dataTuch]: `${imageId}`
        }
  }
  fetch(`${urlText}${id}`, {
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
      } else {
          console.error('La requête a échoué.');
      }
  })
  .catch(error => {
    console.error('La requête a échoué :', error);
  });
  // YEEEEEEE
}).catch(function(error) {
  console.error(error);
});
  };
  
  return (
    <div 
      className={isDragging ? 'drop-zone is-dragging' : 'drop-zone'}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewSrc && (
        <img 
          className="preview"
          src={previewSrc} 
          alt="Aperçu de l'image" 
        />
      )}
      {!previewSrc && (
        <>
          <p>Déposez votre image ici</p>
          <div className="icon-container">
            <i className="fas fa-upload"></i>
          </div>
        </>
      )}
    </div>
  );
}

export default DragAndDrop;
