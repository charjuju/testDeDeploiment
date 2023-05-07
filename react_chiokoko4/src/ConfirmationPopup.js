import React from 'react';

function ConfirmationPopup({onCancel}) {
  
  function handleClickCancel() {
    onCancel();
	}

  return (
    <div className="popup">
      <div className="popup-inner">
        <p>tu est sur le point de supprimer un element</p>
        <button onClick={onCancel}>Annuler</button>
      </div>
    </div>
  );
}

export default ConfirmationPopup;
