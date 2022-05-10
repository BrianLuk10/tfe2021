import React from "react";

/**
 * function pour afficher le message de confirmation car la fonction alert() ne fonctionne pas avec Electron.js => BUG
 * @param {*} show
 * @param {*} confirmer
 * @param {boolean} si show est false affiche rien sinon affiche le message de confirmation
 * @returns {html} message de confimation
 */
export default function Confirmer({ show, confirmer }) {
  if (!show) {
    return <></>;
  }
  return (
    <div className="overlay">
      <div className="dialog">
        <div className="dialog__content">
          <h2 className="dialog__title">Action effectué</h2>
        </div>
        <hr />
        <div className="dialog__footer">
          <button className="dialog__confirm" onClick={confirmer}>
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}
