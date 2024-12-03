import { useState } from "react";
import Navbar from "./componenti/Navbar";
import FormInserimento from "./componenti/FormInserimento";
import CensimentoPC from "./componenti/CensimentoPC";
import "./App.css";

function App() {
  const [pcData, setPcData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const aggiungiPC = (nuovoPC) => {
    setPcData([...pcData, nuovoPC]);
    setShowForm(false); // Nascondi il form dopo l'inserimento
  };

  function gestisciForm () {
    setShowForm(!showForm);
  }

  return (
    <div>
      <Navbar />
      <button className="add" onClick={() => setShowForm((prev) => !prev)}>

      </button>
      {showForm && <FormInserimento onAddPC={aggiungiPC} gestisciForm={gestisciForm} />}
      <CensimentoPC pcData={pcData} />
    </div>
  );
}

export default App;
