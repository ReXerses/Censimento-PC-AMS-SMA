import React, { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PcContext } from "/src/PcContext.jsx";

function ViewPage() {
  const { pcData } = useContext(PcContext);
  const { id } = useParams();
  const navigate = useNavigate();

  // Trova il PC corrispondente all'id
  const pc = pcData.find((item) => item.id === id);

  if (!pc) {
    return <p>Dettagli non trovati</p>;
  }

  return (
    <div className="view-page" style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Torna indietro
      </button>

      <h1 style={{ marginBottom: "20px" }}>Dettagli di {pc.dipendente}</h1>

      <section style={{ marginBottom: "20px" }}>
        <h2>Informazioni Generali</h2>
        <p><strong>Azienda:</strong> {pc.azienda}</p>
        <p><strong>Mansione:</strong> {pc.mansione}</p>
        <p><strong>Ha un PC:</strong> {pc.haiPc ? "Sì" : "No"}</p>
        <p><strong>Dispositivi Mobili:</strong> {pc.dispositiviMobili ? "Sì" : "No"}</p>
        <p><strong>SIM Aziendale:</strong> {pc.SimAziendale ? "Sì" : "No"}</p>
        <p><strong>Accesso VPN Sophos:</strong> {pc.VpnSophos ? "Sì" : "No"}</p>
        <p><strong>Accesso VPN:</strong> {pc.accessoVPN ? "Sì" : "No"}</p>
        <p><strong>Utile:</strong> {pc.utile ? "Sì" : "No"}</p>
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Telefoni Interni</h2>
        {pc.TelInterno.map((tel, index) => (
          <p key={index}><strong>Numero:</strong> {tel.numero}</p>
        ))}
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Computers</h2>
        {pc.computers.map((computer, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <p><strong>PC:</strong> {computer.pc}</p>
            <p><strong>Modello:</strong> {computer.modelloPc}</p>
            <p><strong>Posizione:</strong> {computer.posizioneMacchina}</p>
            <p><strong>Porta Ethernet:</strong> {computer.portaEthernet}</p>
            <p><strong>MAC:</strong> {computer.MAC}</p>
            <p><strong>Windows:</strong> {computer.windows} ({computer.windowsUpdate})</p>
            <p><strong>IP:</strong> {computer.IP}</p>
            <p><strong>DHCP:</strong> {computer.DHCP}</p>
            <p><strong>CPU:</strong> {computer.CPU}</p>
            <p><strong>GPU:</strong> {computer.GPU}</p>
            <p><strong>RAM:</strong> {computer.RAM}</p>
            <p><strong>Note:</strong> {computer.note}</p>
            <h3>Programmi</h3>
            {computer.Programmi.map((program, progIndex) => (
              <div key={progIndex}>
                <p><strong>Programma:</strong> {program.programma}</p>
                <p><strong>Versione:</strong> {program.versione}</p>
                <p><strong>Configurazioni:</strong> {program.configurazioni}</p>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Smartphone/Tablets</h2>
        {pc.smart_tablets.map((device, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <p><strong>Modello:</strong> {device.modelloS_T}</p>
            <p><strong>Seriale:</strong> {device.seriale}</p>
            <p><strong>IMEI:</strong> {device.IMEI}</p>
            <p><strong>MAC:</strong> {device.MAC}</p>
            <p><strong>IP:</strong> {device.IP}</p>
            <p><strong>DHCP:</strong> {device.DHCP}</p>
          </div>
        ))}
      </section>

      <section style={{ marginBottom: "20px" }}>
        <h2>Schede SIM</h2>
        {pc.schedeSIM.map((sim, index) => (
          <div key={index} style={{ marginBottom: "10px", padding: "10px", border: "1px solid #ccc" }}>
            <p><strong>Numero:</strong> {sim.numero}</p>
            <p><strong>PIN:</strong> {sim.pin}</p>
            <p><strong>PUK:</strong> {sim.puk}</p>
            <p><strong>Promozione Attiva:</strong> {sim.promozioneAttiva}</p>
            <p><strong>Necessità:</strong> {sim.necessita}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default ViewPage;
