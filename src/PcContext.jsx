import React, { createContext, useState, useEffect } from "react";

// Crea il contesto
export const PcContext = createContext();

// Provider per gestire lo stato globale
export const PcProvider = ({ children }) => {
  const [pcData, setPcData] = useState(() => {
    // Recupera i dati dal localStorage (o usa un array vuoto come default)
    const storedData = localStorage.getItem("pcData");
    return storedData ? JSON.parse(storedData) : [];
  });

  // Salva i dati nel localStorage ogni volta che pcData cambia
  useEffect(() => {
    localStorage.setItem("pcData", JSON.stringify(pcData));
  }, [pcData]);

  const aggiungiPC = (nuovoPC) => {
    setPcData((prevData) => [...prevData, nuovoPC]);
  };

  return (
    <PcContext.Provider value={{ pcData, setPcData, aggiungiPC }}>
      {children}
    </PcContext.Provider>
  );
};
