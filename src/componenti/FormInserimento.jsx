import { useState, useContext } from "react";
import { PcContext } from "/src/PcContext.jsx";
import { v4 as uuidv4 } from "uuid";

function FormInserimento({gestisciForm}) {
  const { aggiungiPC } = useContext(PcContext);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    dipendente: "",
    azienda: "",
    mansione: "",
    haiPc: false,
    dispositiviMobili: false,
    TelInterno: [],
    SimAziendale: false,
    VpnSophos: false,
    computers: [],
    smart_tablets: [],
    schedeSIM: [],
    accessoVPN: false,
    utile: false,
  });

  const [currentComputer, setCurrentComputer] = useState({
    pc: "",
    modelloPc: "",
    posizioneMacchina: "",
    portaEthernet: "",
    MAC: "",
    windows: "",
    windowsUpdate: "",
    IP: "",
    DHCP: "",
    CPU: "",
    GPU: "",
    RAM: "",
    note: "",
    Programmi: [],
  });

  const [currentSmart_tablet, setCurrentSmart_tablet] = useState({
    modelloS_T: "",
    seriale: "",
    IMEI: "",
    MAC: "",
    IP: "",
    DHCP: "",
  });

  const [currentProgramma, setCurrentProgramma] = useState({
    programma: "",
    versione: "",
    configurazioni: "",
  });

  const [currentSIM, setCurrentSIM] = useState({
    numero: "",
    pin: "",
    puk: "",
    promozioneAttiva: "",
    necessita: "",
  });

  const [currentTelInterno, setCurrentTelInterno] = useState({
    numero: "",
  });

  const [step, setStep] = useState(1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleComputerChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setCurrentComputer({ ...currentComputer, [name]: val });
  };

  const handleProgrammaChange = (e) => {
    const { name, value } = e.target;
    setCurrentProgramma({ ...currentProgramma, [name]: value });
  };

  const handleSIMChange = (e) => {
    const { name, value } = e.target;
    setCurrentSIM({ ...currentSIM, [name]: value });
  };

  const handleSmart_TabletChange = (e) => {
    const { name, value } = e.target;
    setCurrentSmart_tablet({ ...currentSmart_tablet, [name]: value });
  };

  const handleTelInternoChange = (e) => { const { name, value } = e.target; setCurrentTelInterno({ ...currentTelInterno, [name]: value }); };

  const addTelInterno = () => {
    if (currentTelInterno.numero) {
      setFormData((prev) => ({
        ...prev,
        TelInterno: [...prev.TelInterno, currentTelInterno],
      }));
      setCurrentTelInterno({ numero: "" });
    }
  };

  const addProgramma = () => {
    if (currentProgramma.programma && currentProgramma.versione) {
      setCurrentComputer((prev) => ({
        ...prev,
        Programmi: [...prev.Programmi, currentProgramma],
      }));
      setCurrentProgramma({ programma: "", versione: "", configurazioni: "" });
    }
  };

  const addSIM = () => {
    if (currentSIM.numero && currentSIM.promozioneAttiva && currentSIM.necessita) {
      setFormData((prev) => ({
        ...prev,
        schedeSIM: [...prev.schedeSIM, currentSIM],
      }));
      setCurrentSIM({ numero: "", pin:"", puk:"", promozioneAttiva: "", necessita: "" });
    }
  };
  

  const addSmart_tablet = () => {
    if (currentSmart_tablet.modelloS_T && currentSmart_tablet.seriale && currentSmart_tablet.MAC) {
      setFormData((prev) => ({
        ...prev,
        smart_tablets: [...prev.smart_tablets, currentSmart_tablet],
      }));
      setCurrentSmart_tablet({ modelloS_T: "", seriale: "", IMEI: "",  MAC: "", IP:"", DHCP:"" });
    }
  };

  const addComputer = () => {
    if (currentComputer.pc && currentComputer.modelloPc) {
      setFormData((prev) => ({
        ...prev,
        computers: [...prev.computers, currentComputer],
      }));
      setCurrentComputer({
        pc: "",
        modelloPc: "",
        posizioneMacchina: "",
        MAC: "",
        windows: "",
        windowsUpdate: "",
        IP: "",
        DHCP: "",
        CPU: "",
        GPU: "",
        RAM: "",
        note: "",
        Programmi: [],
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validazione base per evitare salvataggi incompleti
    if (!formData.dipendente || !formData.mansione) {
      alert("Per favore, compila almeno il nome del dipendente e la mansione.");
      return;
    }

    // Aggiungere i dati raccolti al contesto globale
    aggiungiPC(formData);

    // Reset dello stato del modulo
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: uuidv4(),
      dipendente: "",
      azienda: "",
      mansione: "",
      haiPc: false,
      dispositiviMobili: false,
      TelInterno: [],
      SimAziendale: false,
      VpnSophos: false,
      computers: [],
      smart_tablets: [],
      schedeSIM: [],
      accessoVPN: false,
      utile: false,
    });

    setCurrentComputer({
      pc: "",
      modelloPc: "",
      posizioneMacchina: "",
      MAC: "",
      windows: "",
      windowsUpdate: "",
      IP: "",
      DHCP: "",
      CPU: "",
      GPU: "",
      RAM: "",
      note: "",
      Programmi: [],
    });

    setCurrentSmart_tablet({
      modelloS_T: "",
      seriale: "",
      IMEI: "",
      MAC: "",
      IP: "",
      DHCP: "",
    });

    setCurrentProgramma({
      programma: "",
      versione: "",
      configurazioni: "",
    });

    setCurrentSIM({
      numero: "",
      pin: "",
      puk: "",
      promozioneAttiva: "",
      necessita: "",
    });

    setCurrentTelInterno({ 
      numero: "",
    });

    setStep(1); // Riporta l'utente allo step iniziale
  };

  return (
    <div className="popup">
      <form onSubmit={handleSubmit} className="popup-content">
        <div className="contenitoreClose">
          <div className="inputs">
            <h2>Inserimento Dati</h2>
            <button type="submit" className="salva"></button>
          </div>

          <button className="chiudi" onClick={gestisciForm}></button>
        </div>

        {step === 1 && (
          <>
            <div className="infoBase">
              <div className="primaRiga">
                <input
                  type="text"
                  name="dipendente"
                  placeholder="Nome Dipendente"
                  value={formData.dipendente}
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  name="azienda"
                  placeholder="Azienda"
                  value={formData.azienda}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="secondaRiga">
                <input
                  type="text"
                  name="mansione"
                  placeholder="Mansione"
                  value={formData.mansione}
                  onChange={handleChange}
                  required
                />

                <div className="primaRiga">
                  <input
                    type="number"
                    name="numero"
                    placeholder="Tel interno"
                    value={currentTelInterno.numero}
                    onChange={handleTelInternoChange}
                  />

                </div>

                <button type="button" onClick={addTelInterno}>
                    Aggiungi Interno
                </button>
              </div>
                
              
            </div>

            <div className="infoBase">
              <div className="primaRiga">
                <label>
                  Hai un PC?
                  <input
                    type="checkbox"
                    name="haiPc"
                    checked={formData.haiPc}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Possiedi dispositivi mobili?
                  <input
                    type="checkbox"
                    name="dispositiviMobili"
                    checked={formData.dispositiviMobili}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Possiedi SIM aziendale?
                  <input
                    type="checkbox"
                    name="SimAziendale"
                    checked={formData.SimAziendale}
                    onChange={handleChange}
                  />
                </label>
              </div>
              
              <div className="secondaRiga">
                <label>
                  Possiedi credenziali VPN?
                  <input
                    type="checkbox"
                    name="accessoVPN"
                    checked={formData.accessoVPN}
                    onChange={handleChange}
                  />
                </label>
                <label>
                  L'accesso alla VPN è ancora necessario?
                  <input
                    type="checkbox"
                    name="utile"
                    checked={formData.utile}
                    onChange={handleChange}
                  />
                </label>
                <button type="button" onClick={() => setStep(2)}>
                  Avanti
                </button>
              </div>
            
            </div>
            
          </>
        )}

        {step === 2 && /*formData.haiPc &&*/ (
          <>
            
            <h3>Aggiungi Programmi</h3>
            <div className="infoBase">
              <div className="primaRiga">
                <input
                  type="text"
                  name="programma"
                  placeholder="Nome Programma"
                  value={currentProgramma.programma}
                  onChange={handleProgrammaChange}
                />
                <input
                  type="text"
                  name="versione"
                  placeholder="Versione"
                  value={currentProgramma.versione}
                  onChange={handleProgrammaChange}
                />
              </div>
              <div className="secondaRiga">
                <textarea
                  name="configurazioni"
                  placeholder="Configurazioni Speciali"
                  value={currentProgramma.configurazioni}
                  onChange={handleProgrammaChange}
                />
                
              </div>
              <button type="button" onClick={addProgramma}>
                  Aggiungi Programma
              </button>
            </div>


            <h3>Aggiungi Computer</h3>
            <div className="infoBase">
              <div className="primaRiga">
                <input
                  type="number"
                  name="pc"
                  placeholder="Numero PC"
                  value={currentComputer.pc}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="modelloPc"
                  placeholder="Modello PC"
                  value={currentComputer.modelloPc}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="posizioneMacchina"
                  placeholder="Posizione Macchina"
                  value={currentComputer.posizioneMacchina}
                  onChange={handleComputerChange}
                />

                <input
                  type="text"
                  name="portaEthernet"
                  placeholder="Porta Ethernet"
                  value={currentComputer.portaEthernet}
                  onChange={handleComputerChange}
                />
              </div>
              
              <div className="primaRiga">
                <input
                  type="text"
                  name="MAC"
                  placeholder="MAC"
                  value={currentComputer.MAC}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="windows"
                  placeholder="Edizione Windows"
                  value={currentComputer.windows}
                  onChange={handleComputerChange}
                />

                <input
                  type="text"
                  name="windowsUpdate"
                  placeholder="Update Windows"
                  value={currentComputer.windowsUpdate}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="IP"
                  placeholder="IP"
                  value={currentComputer.IP}
                  onChange={handleComputerChange}
                />

              </div>
     
            
              <div className="secondaRiga">
                <input
                  type="text"
                  name="DHCP"
                  placeholder="DHCP"
                  value={currentComputer.DHCP}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="CPU"
                  placeholder="CPU"
                  value={currentComputer.CPU}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="GPU"
                  placeholder="GPU"
                  value={currentComputer.GPU}
                  onChange={handleComputerChange}
                />
                <input
                  type="text"
                  name="RAM"
                  placeholder="RAM"
                  value={currentComputer.RAM}
                  onChange={handleComputerChange}
                />
              </div>

              <div className="secondaRiga">
                <textarea
                  name="note"
                  placeholder="Note"
                  value={currentComputer.note}
                  onChange={handleComputerChange}
                />
              </div>
            </div>
            <div className="buttonsForm">
              <button type="button" onClick={addComputer}>
                Aggiungi PC
              </button>
              <button type="button" onClick={() => setStep(3)}>
                Avanti
              </button>
            </div>
        
          </>
        )}

        {step === 3 /*&& formData.dispositiviMobili*/ && (
          <>
            <h3>Aggiungi Smartphones o Tablets</h3>
            <div className="infoBase">
              <div className="primaRiga">
                <input
                  type="text"
                  name="modelloS_T"
                  placeholder="Modello dispositivo mobile"
                  value={currentSmart_tablet.modelloS_T}
                  onChange={handleSmart_TabletChange}
                />
                <input
                  type="text"
                  name="seriale"
                  placeholder="Seriale"
                  value={currentSmart_tablet.seriale}
                  onChange={handleSmart_TabletChange}
                />
                <input
                  type="text"
                  name="IMEI"
                  placeholder="IMEI"
                  value={currentSmart_tablet.IMEI}
                  onChange={handleSmart_TabletChange}
                />
              </div>

              <div className="primaRiga">
                  <input
                    type="text"
                    name="MAC"
                    placeholder="MAC"
                    value={currentSmart_tablet.MAC}
                    onChange={handleSmart_TabletChange}
                  />

                  <input
                    type="text"
                    name="IP"
                    placeholder="IP"
                    value={currentSmart_tablet.IP}
                    onChange={handleSmart_TabletChange}
                  />
                  <input
                    type="text"
                    name="DHCP"
                    placeholder="DHCP"
                    value={currentSmart_tablet.DHCP}
                    onChange={handleSmart_TabletChange}
                  />
              </div>
                
            </div>
            <div className="buttonsForm">
              <button type="button" onClick={addSmart_tablet}>
                Aggiungi Dispositivo
              </button>
              <button type="button" onClick={() => setStep(4)}>
                Avanti
              </button>
            </div>
            
          </>
        )}

        {step === 4 && /*formData.SimAziendale &&*/ (
          <>
            <h3>Aggiungi SIM</h3>
            <div className="infoBase">
              <div className="primaRiga">

                <input
                  type="text"
                  name="numero"
                  placeholder="Numero SIM"
                  value={currentSIM.numero}
                  onChange={handleSIMChange}
                />
                <input
                  type="number"
                  name="pin"
                  placeholder="PIN"
                  value={currentSIM.pin}
                  onChange={handleSIMChange}
                />
                <input
                  type="number"
                  name="puk"
                  placeholder="PUK"
                  value={currentSIM.puk}
                  onChange={handleSIMChange}
                />

              </div>

              <div className="primaRiga">
                <input
                    type="text"
                    name="promozioneAttiva"
                    placeholder="Promozione Attiva"
                    value={currentSIM.promozioneAttiva}
                    onChange={handleSIMChange}
                  />
                  <input
                    type="text"
                    name="necessita"
                    placeholder="Necessità"
                    value={currentSIM.necessita}
                    onChange={handleSIMChange}
                  />
              </div>
                
            </div>
            <div className="buttonsForm">
              <button type="button" onClick={addSIM}>
                Aggiungi SIM
              </button>
              <button type="button" onClick={() => setStep(5)}>
                Avanti
              </button>
            </div>
            
          </>
        )}

      </form>
    </div>
  );
}

export default FormInserimento;
