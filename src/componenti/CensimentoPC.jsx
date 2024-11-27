import { useContext, useState } from "react";
import { PcContext } from "/src/PcContext.jsx";

function CensimentoPC() {
  const { pcData } = useContext(PcContext);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = pcData.filter(
    (pc) =>
      pc.persona.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(pc.pc).includes(searchQuery)
  );

  return (
    <div>
      <h2>Lista PC</h2>
      <input
        type="text"
        placeholder="Cerca per nome o numero PC"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <ul>
        {filteredData.map((pc, index) => (
          <li key={index}>
            <p>Nome: {pc.persona}</p>
            <p>Mansione: {pc.mansione}</p>
            <p>PC: {pc.pc}</p>
            <ul>
              {pc.programmi.map((prog, i) => (
                <li key={i}>
                  {prog.nome} (Versione: {prog.versione})
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CensimentoPC;
