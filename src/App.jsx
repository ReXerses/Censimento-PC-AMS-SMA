import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componenti/Navbar";
import FormInserimento from "./componenti/FormInserimento";
import CensimentoPC from "./componenti/CensimentoPC";
import ViewPage from "./componenti/ViewPage";
import EditPage from "./componenti/EditPage";
import "./App.css";

function App() {
  const [pcData, setPcData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const aggiungiPC = (nuovoPC) => {
    setPcData([...pcData, nuovoPC]);
    setShowForm(false); // Nascondi il form dopo l'inserimento
  };

  const gestisciForm = () => {
    setShowForm((prev) => !prev);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <button className="add" onClick={() => setShowForm((prev) => !prev)}></button>
                {showForm && <FormInserimento onAddPC={aggiungiPC} gestisciForm={gestisciForm} />}
                <CensimentoPC pcData={pcData} />
              </>
            }
          />
          <Route path="/view/:id" element={<ViewPage/>} />
          <Route path="/edit/:id" element={<EditPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;