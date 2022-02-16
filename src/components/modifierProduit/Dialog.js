import React from "react";

export default function Dialog({ show, confirm, cancel, cancelDialog }) {
  if (!show) {
    return <></>;
  }
  return (
    <div className="overlay">
      <div className="dialog">
        <div className="dialog__content">
          <h2 className="dialog__title">Supprimer le produit?</h2>
          <p className="dialog__description">
            Voule-vous vraiment supprimer le produit ?
          </p>
        </div>
        <hr />
        <div className="dialog__footer">
          <button className="dialog__cancel" onClick={cancel}>
            Annuler
          </button>
          <button className="dialog__confirm" onClick={confirm}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
