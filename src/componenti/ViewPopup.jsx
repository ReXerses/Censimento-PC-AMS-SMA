import React from "react";

function ViewPopup({ pc, onClose }) {
  if (!pc) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Dettagli Completi</h3>
        <p><strong>Dipendente:</strong> {pc.dipendente}</p>
        <p><strong>Azienda:</strong> {pc.azienda}</p>
        <p><strong>Mansione:</strong> {pc.mansione}</p>
        <p><strong>Interno:</strong> {pc.TelInterno}</p>
        <p><strong>Dispositivi Mobili:</strong> {pc.dispositiviMobili ? "Sì" : "No"}</p>
        <p><strong>VPN Sophos:</strong> {pc.VpnSophos ? "Sì" : "No"}</p>

        <h4>Computers:</h4>
        {pc.computers.map((computer, index) => (
          <div key={index}>
            <p><strong>PC:</strong> {computer.pc}</p>
            <p><strong>Modello:</strong> {computer.modelloPc}</p>
            <p><strong>Windows:</strong> {computer.windows}</p>
          </div>
        ))}

        <h4>Smartphone/Tablet:</h4>
        {pc.smart_tablets.map((tablet, index) => (
          <div key={index}>
            <p><strong>Modello:</strong> {tablet.modelloS_T}</p>
            <p><strong>Seriale:</strong> {tablet.seriale}</p>
          </div>
        ))}

        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}

export default ViewPopup;
