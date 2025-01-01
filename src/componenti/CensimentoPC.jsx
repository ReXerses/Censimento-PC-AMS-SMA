import React, { useContext, useState } from "react";
import { PcContext } from "/src/PcContext.jsx";
import { useNavigate } from "react-router-dom";
import * as XLSX from 'xlsx';

function CensimentoPC() {
  const { pcData, setPcData } = useContext(PcContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null); // Gestisce il popup di conferma
  const navigate = useNavigate();

const esportaExcel = (data) => {
  // Prepara i fogli
  const foglioDipendenti = data.map((dip) => ({
    Nome: dip.dipendente,
    Azienda: dip.azienda,
    Mansione: dip.mansione,
    "Possiede PC": dip.haiPc ? "Sì" : "No",
    "Possiede Dispositivi Mobili": dip.dispositiviMobili ? "Sì" : "No",
    "Accesso VPN": dip.accessoVPN ? "Sì" : "No"
  }));

  const foglioPC = data.flatMap((dip) =>
    dip.computers.map((pc) => ({
      Dipendente: dip.dipendente,
      "Numero PC": pc.pc,
      Modello: pc.modelloPc,
      Posizione: pc.posizioneMacchina,
      "Porta Ethernet": pc.portaEthernet,
      MAC: pc.MAC,
      IP: pc.IP,
      DHCP: pc.DHCP,
      CPU: pc.CPU,
      GPU: pc.GPU,
      RAM: pc.RAM,
      "Windows Versione": pc.windows,
      "Windows Update": pc.windowsUpdate,
      Note: pc.note,
      "Programmi Installati": pc.Programmi.map(
        (prog) => `${prog.programma} (v${prog.versione})`
      ).join(", ")
    }))
  );

  const foglioDispositivi = data.flatMap((dip) =>
    dip.smart_tablets.map((device) => ({
      Dipendente: dip.dipendente,
      Modello: device.modelloS_T,
      Seriale: device.seriale,
      IMEI: device.IMEI,
      MAC: device.MAC,
      IP: device.IP,
      DHCP: device.DHCP
    }))
  );

  const foglioSIM = data.flatMap((dip) =>
    dip.schedeSIM.map((sim) => ({
      Dipendente: dip.dipendente,
      "Numero SIM": sim.numero,
      PIN: sim.pin,
      PUK: sim.puk,
      Promozione: sim.promozioneAttiva,
      Necessità: sim.necessita
    }))
  );

  // Crea i fogli di lavoro
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(foglioDipendenti), "Dipendenti");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(foglioPC), "PC");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(foglioDispositivi), "Dispositivi Mobili");
  XLSX.utils.book_append_sheet(workbook, XLSX.utils.json_to_sheet(foglioSIM), "Schede SIM");

  // Scrivi il file Excel
  XLSX.writeFile(workbook, "CensimentoAziendale.xlsx");
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

  const handleDeleteConfirm = (id) => {
    setDeleteConfirm(id); // Memorizza l'ID per il quale è richiesta la conferma
  };

  const handleDelete = (id) => {
    const updatedPcData = pcData.filter((pc) => pc.id !== id);
    setPcData(updatedPcData);
    setDeleteConfirm(null); // Chiude il popup di conferma
  };

  const handleCancelDelete = () => {
    setDeleteConfirm(null); // Chiude il popup di conferma senza eliminare
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
        <button onClick={() => esportaExcel(pcData)}>Esporta in Excel</button>

        
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
                    <span className="elemento"> {pc.TelInterno[0]?.numero || "Non disponibile"} - {pc.TelInterno[1]?.numero} </span>
                    <span className="elemento"> {pc.computers[0] ? pc.computers[0].pc : "No PC"} </span>
                    <span className="elemento"> {pc.SimAziendale ? "Sì" : "No"} </span>
                    <span className="elemento"> {pc.dispositiviMobili ? "Sì" : "No"} </span>
                    <span className="elemento"> {pc.VpnSophos ? "Sì" : "No"} </span>

                    
                    <div className="buttons elemento">

                    <button className='elemento edit' onClick={() => navigate(`/edit/${pc.id}`)}></button>

                      <button className='elemento view' onClick={() => navigate(`/view/${pc.id}`)}></button>
                      <button className="elemento delete" type="button" onClick={() => handleDeleteConfirm(pc.id)}></button>
                    </div>

                  
                
              </li>
            ))}
            
          </div>
          
        </ul>
      )}
      {deleteConfirm && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Sei sicuro di voler eliminare questo dipendente?</p>
            <button onClick={() => handleDelete(deleteConfirm)}>Conferma</button>
            <button onClick={handleCancelDelete}>Annulla</button>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default CensimentoPC;
