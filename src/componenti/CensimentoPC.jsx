import React, { useContext, useState } from "react";
import { PcContext } from "/src/PcContext.jsx";
import EditPopup from "./EditPopup";
import ViewPopup from "./ViewPopup";

function CensimentoPC() {
  const { pcData, setPcData } = useContext(PcContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPC, setSelectedPC] = useState(null);
  const [isViewing, setIsViewing] = useState(false); // Gestisce il popup di visualizzazione
  const [selectedPCView, setSelectedPCView] = useState(null); // Memorizza l'oggetto da visualizzare

  const handleView = (pc) => {
    setSelectedPCView(pc);
    setIsViewing(true);
  };

  function exportData() {
    const data = localStorage.getItem("pcData");
    if (!data) {
      alert("Nessun dato da esportare!");
      return;
    }
  
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "pcData.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function importData(event) {
    const file = event.target.files[0];
    if (!file) {
      alert("Nessun file selezionato!");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (!Array.isArray(importedData)) {
          alert("Formato del file non valido!");
          return;
        }
        localStorage.setItem("pcData", JSON.stringify(importedData));
        alert("Dati importati con successo!");
        window.location.reload(); // Ricarica la pagina per riflettere i nuovi dati
      } catch (error) {
        alert("Errore durante l'importazione dei dati: " + error.message);
      }
    };
    reader.readAsText(file);
  }
  


  const filteredData = pcData.filter(
    (pc) => 
      pc.dipendente.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(pc?.computers?.[0]?.pc || "").includes(searchQuery) || 
      String(pc?.schedeSIM?.[0]?.numero || "").includes(searchQuery)
  );

  const handleDelete = (id) => {
    const updatedPcData = pcData.filter((pc) => pc.id !== id); // Filtra i dati escludendo l'elemento con l'id specificato
    setPcData(updatedPcData); // Aggiorna lo stato con l'array filtrato
  };
  

  const handleEdit = (pc) => {
    setSelectedPC(pc);
    setIsEditing(true);
    console.log(pc)
  };

  const handleSave = (updatedPC) => {
    setPcData((prevData) =>
      prevData.map((pc) => (pc.id === updatedPC.id ? updatedPC : pc))
    );
    setIsEditing(false);
    setSelectedPC(null);
  };

  

  return (
    <div className="contenitore">

      <div className="inputs">
        <input
          className="searchbox"
          type="text"
          placeholder="Cerca per nome o numero PC"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div>
          <button onClick={exportData}>Esporta Dati</button>
          <input 
            type="file" 
            accept="application/json" 
            onChange={importData} 
            style={{ display: "inline-block", marginLeft: "10px" }} 
          />
        </div>
        
      </div>


      {filteredData.length === 0 ? (
        <ul className="contenuto">
        <div className="contenitoreRisultati">
          <div className="legenda">
            <span className="elemento">Dipendente</span>
            <span className="elemento">Mansione</span>
            <span className="elemento">Interno</span>
            <span className="elemento">PC</span>
            <span className="elemento">SIM</span>
            <span className="elemento">Cell/tablet</span>
            <span className="elemento">VPN</span>
            <div className="elemento">Azioni</div>
          </div>
          <p>Nessun risultato trovato</p>
        </div>
        </ul>

      ) : (
        <ul className="contenuto">
          

          <div className="contenitoreRisultati">
          <div className="legenda">
                  <span className="elemento">Dipendente</span>
                  <span className="elemento">Azienda</span>
                  <span className="elemento">Mansione</span>
                  <span className="elemento">Interno</span>
                  <span className="elemento">PC</span>
                  <span className="elemento">SIM</span>
                  <span className="elemento">Cell/tablet</span>
                  <span className="elemento">VPN</span>
                  <div className="elemento">Azioni</div>
                  
          </div>
            {filteredData.map((pc) => (
              
              <li 
                key={pc.id} 
                className={`oggetto ${pc.azienda === 'AMS' ? 'ams-bg' : pc.azienda === 'SMA' ? 'sma-bg' : ''}`} 
              >

                  
                    <span className="elemento"> {pc.dipendente || "Non disponibile"} </span>
                    <span className="elemento"> {pc.azienda || "Non disponibile"} </span>
                    <span className="elemento"> {pc.mansione || "Non disponibile"} </span>
                    <span className="elemento"> {pc.TelInterno || "Non disponibile"} </span>
                    <span className="elemento"> {pc.computers[0] ? pc.computers[0].pc : "No PC"} </span>
                    <span className="elemento"> {pc.SimAziendale ? "Sì" : "No"} </span>
                    <span className="elemento"> {pc.dispositiviMobili ? "Sì" : "No"} </span>
                    <span className="elemento"> {pc.VpnSophos ? "Sì" : "No"} </span>

                    
                    <div className="buttons elemento">

                      <button className="elemento edit" type="button" onClick={() => handleEdit(pc)}></button>
                      <button className="elemento view" type="button" onClick={() => handleView(pc)}></button>
                      <button className="elemento delete" type="button" onClick={() => handleDelete(pc.id)}></button>
                    </div>

                  
                
              </li>
            ))}
            
          </div>
          
        </ul>
      )}
      {isViewing && (
        <ViewPopup 
          pc={selectedPCView} 
          onClose={() => setIsViewing(false)} 
        />
      )}
      {isEditing && (
        <EditPopup
          pc={selectedPC}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
}

export default CensimentoPC;
