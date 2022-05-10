import React from "react";

/**
 * function pour afficher le message de confirmation pour supprimer le produit car la fonction alert() ne fonctionne pas avec Electron.js => BUG
 * @param {*} show
 * @param {*} confirmer
 * @param {*} cancel
 * @param {boolean} si show est false affiche rien sinon affiche le message de confirmation
 * @returns {html} message de confimation
 */
export default function Dialog({ show, confirm, cancel }) {
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
