import { useState, React } from "react";
import FormInserimento from "./componenti/FormInserimento";
import CensimentoPC from "./componenti/CensimentoPC";

function App() {
  const [pcData, setPcData] = useState([]);

  const aggiungiPC = (nuovoPC) => {
    setPcData([...pcData, nuovoPC]);
  };

  return (
    <div>
      <FormInserimento onAddPC={aggiungiPC} />
      <CensimentoPC pcData={pcData} />
    </div>
  );
}

export default App;

