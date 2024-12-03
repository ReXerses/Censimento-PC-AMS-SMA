import React from "react";
import { useState } from "react";

function ViewPopup({ pc, onClose }) {
  const [isApertoInfoComputers, setIsApertoInfoComputers] = useState(false);
  const [isApertoInfoSmartP_tablet, setIsApertoInfoSmartP_tablet] = useState(false);
  const [isApertoInfoSIM, setIsApertoInfoSIM] = useState(false);

  if (!pc) return null;

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Dettagli Completi</h3>
        <div className="infoBase">

          <div className="primaRiga">
            <p className="elementoV"><strong>Dipendente:</strong> {pc.dipendente}</p>
            <p className="elementoV"><strong>Azienda:</strong> {pc.azienda}</p>
            <p className="elementoV"><strong>Mansione:</strong> {pc.mansione}</p>
          </div>

          <div className="primaRiga">
            <p className="elementoV"><strong>Interno:</strong> {pc.TelInterno[0]?.numero || "Non disponibile"} - {pc.TelInterno[1]?.numero}</p>
            <p className="elementoV"><strong>Dispositivi Mobili:</strong> {pc.dispositiviMobili ? "Sì" : "No"}</p>
            <p className="elementoV"><strong>VPN Sophos:</strong> {pc.VpnSophos ? "Sì" : "No"}</p>
          </div>
        </div>


        <div className='rigaDropDown'>
            <h4>Computers:</h4>
            <button className={isApertoInfoComputers  ? `aperto` : 'chiuso'} onClick={() => setIsApertoInfoComputers(!isApertoInfoComputers)}></button>
        </div>
        
        {isApertoInfoComputers && (
          <div className="contenutoRegole">
            {pc.computers.map((computer, index) => (
              <div key={index} className="infoBase">
                <div className="primaRiga">
                  <p className="elementoV"><strong>PC:</strong> {computer.pc}</p>
                  <p className="elementoV"><strong>Modello:</strong> {computer.modelloPc}</p>
                  <p className="elementoV"><strong>MAC:</strong> {computer.MAC}</p>
                  <p className="elementoV"><strong>Windows:</strong> {computer.windows}</p>
                </div>

                <div className="primaRiga">
                  <p className="elementoV"><strong>Win Update:</strong> {computer.windowsUpdate}</p>
                  <p className="elementoV"><strong>CPU:</strong> {computer.CPU}</p>
                  <p className="elementoV"><strong>GPU:</strong> {computer.GPU}</p>
                  <p className="elementoV"><strong>RAM:</strong> {computer.RAM}Gb</p>
                </div>

                <h4>Programmi:</h4>
                {computer.Programmi.map((programma, index) => (
                  <div key={index}>
                    <div className="primaRiga">
                      <p className="elementoV"><strong>Programma:</strong> {programma.programma}</p>
                      <p className="elementoV"><strong>Versione:</strong> {programma.versione}</p>
                    </div>
                    <div>
                      <h5>Configurazioni:</h5>
                      <p className="elementoV">{programma.configurazioni}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className='rigaDropDown'>
          <h4>Smartphone/Tablet:</h4>
            <button className={isApertoInfoSmartP_tablet  ? `aperto` : 'chiuso'} onClick={() => setIsApertoInfoSmartP_tablet(!isApertoInfoSmartP_tablet)}></button>
        </div>
  

        {isApertoInfoSmartP_tablet && (
          <div className="contenutoRegole">
            {pc.smart_tablets.map((tablet, index) => (
              <div key={index} className="infoBase">
                <div className="primaRiga">
                  <p className="elementoV">
                    <strong>Modello:</strong> {tablet.modelloS_T}
                  </p>
                  <p className="elementoV">
                    <strong>Seriale:</strong> {tablet.seriale}
                  </p>
                  <p className="elementoV">
                    <strong>MAC:</strong> {tablet.MAC}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='rigaDropDown'>
          <h4>Schede SIM:</h4>
            <button className={isApertoInfoSIM  ? `aperto` : 'chiuso'} onClick={() => setIsApertoInfoSIM(!isApertoInfoSIM)}></button>
        </div>

        {isApertoInfoSIM && (
          <div className="contenutoRegole">
            {pc.schedeSIM.map((SIM, index) => (
              <div key={index} className="infoBase">
                <div className="primaRiga">
                  <p className="elementoV">
                    <strong>Numero:</strong> {SIM.numero}
                  </p>
                  <p className="elementoV">
                    <strong>Promozione:</strong> {SIM.promozioneAttiva}
                  </p>
                  <p className="elementoV">
                    <strong>Necessità:</strong> {SIM.necessita}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={onClose}>Chiudi</button>
      </div>
    </div>
  );
}

export default ViewPopup;
