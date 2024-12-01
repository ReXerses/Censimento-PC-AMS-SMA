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
    TelInterno: "",
    SimAziendale: false,
    VpnSophos: false,
    computers: [],
    smart_tablets: [],
    schedeSIM: [],
    accessoVPN: false,
    utile: false,
  });

  const [currentComputer, setCurrentComputer] = useState({
    pc: "000",
    modelloPc: "",
    MAC: "",
    windows: "",
    windowsUpdate: "",
    CPU: "",
    GPU: "",
    RAM: "",
    Programmi: [],
  });

  const [currentSmart_tablet, setCurrentSmart_tablet] = useState({
    modelloS_T: "",
    seriale: "",
    MAC: "",
  });

  const [currentProgramma, setCurrentProgramma] = useState({
    programma: "",
    versione: "",
    configurazioni: "",
  });

  const [currentSIM, setCurrentSIM] = useState({
    numero: "000",
    promozioneAttiva: "",
    necessita: "",
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
      setCurrentSIM({ numero: "", promozioneAttiva: "", necessita: "" });
    }
  };
  

  const addSmart_tablet = () => {
    if (currentSmart_tablet.modelloS_T && currentSmart_tablet.seriale && currentSmart_tablet.MAC) {
      setFormData((prev) => ({
        ...prev,
        smart_tablets: [...prev.smart_tablets, currentSmart_tablet],
      }));
      setCurrentSmart_tablet({ modelloS_T: "", seriale: "", MAC: "" });
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
        MAC: "",
        windows: "",
        windowsUpdate: "",
        CPU: "",
        GPU: "",
        RAM: "",
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
      TelInterno: "",
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
      MAC: "",
      windows: "",
      windowsUpdate: "",
      CPU: "",
      GPU: "",
      RAM: "",
      Programmi: [],
    });

    setCurrentSmart_tablet({
      modelloS_T: "",
      seriale: "",
      MAC: "",
    });

    setCurrentProgramma({
      programma: "",
      versione: "",
      configurazioni: "",
    });

    setCurrentSIM({
      numero: "",
      promozioneAttiva: "",
      necessita: "",
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
                <input
                  type="number"
                  name="TelInterno"
                  placeholder="Tel interno"
                  value={formData.TelInterno}
                  onChange={handleChange}
                />
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

        {step === 2 && formData.haiPc && (
          <>
            <h3>Aggiungi Computer</h3>
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
            <button type="button" onClick={addComputer}>
              Aggiungi Computer
            </button>
            <h3>Aggiungi Programmi</h3>
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
            <textarea
              name="configurazioni"
              placeholder="Configurazioni Speciali"
              value={currentProgramma.configurazioni}
              onChange={handleProgrammaChange}
            />
            <button type="button" onClick={addProgramma}>
              Aggiungi Programma
            </button>
            <button type="button" onClick={() => setStep(3)}>
              Avanti
            </button>
          </>
        )}

        {step === 3 && formData.dispositiviMobili && (
          <>
            <h3>Aggiungi Smartphones o Tablets</h3>
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
              name="MAC"
              placeholder="MAC"
              value={currentSmart_tablet.MAC}
              onChange={handleSmart_TabletChange}
            />
            <button type="button" onClick={addSmart_tablet}>
              Aggiungi Dispositivo
            </button>
            <button type="button" onClick={() => setStep(4)}>
              Avanti
            </button>
          </>
        )}

        {step === 4 && formData.SimAziendale && (
          <>
            <h3>Aggiungi SIM</h3>
            <input
              type="text"
              name="numero"
              placeholder="Numero SIM"
              value={currentSIM.numero}
              onChange={handleSIMChange}
            />
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
            <button type="button" onClick={addSIM}>
              Aggiungi SIM
            </button>
            <button type="button" onClick={() => setStep(5)}>
              Avanti
            </button>
          </>
        )}

      </form>
    </div>
  );
}

export default FormInserimento;
