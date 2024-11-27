import { useState, useContext } from "react";
import { PcContext } from "/src/PcContext.jsx";

function FormInserimento() {
  const { aggiungiPC } = useContext(PcContext);

  const [formData, setFormData] = useState({
    persona: "",
    mansione: "",
    pc: "",
    programmi: [],
  });

  const [programma, setProgramma] = useState({ nome: "", versione: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProgrammaChange = (e) => {
    const { name, value } = e.target;
    setProgramma({ ...programma, [name]: value });
  };

  const addProgramma = () => {
    if (programma.nome && programma.versione) {
      setFormData((prev) => ({
        ...prev,
        programmi: [...prev.programmi, programma],
      }));
      setProgramma({ nome: "", versione: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    aggiungiPC(formData); // Aggiungo i dati al contesto globale
    setFormData({ persona: "", mansione: "", pc: "", programmi: [] }); // Resetto il form dopo l'aggiunta
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Inserimento PC</h2>
      <input
        type="text"
        name="persona"
        placeholder="Nome Persona"
        value={formData.persona}
        onChange={handleChange}
      />
      <input
        type="text"
        name="mansione"
        placeholder="Mansione"
        value={formData.mansione}
        onChange={handleChange}
      />
      <input
        type="number"
        name="pc"
        placeholder="Numero PC"
        value={formData.pc}
        onChange={handleChange}
      />
      <div>
        <input
          type="text"
          name="nome"
          placeholder="Nome Programma"
          value={programma.nome}
          onChange={handleProgrammaChange}
        />
        <input
          type="text"
          name="versione"
          placeholder="Versione"
          value={programma.versione}
          onChange={handleProgrammaChange}
        />
        <button type="button" onClick={addProgramma}>
          Aggiungi Programma
        </button>
      </div>
      <button type="submit">Salva</button>
    </form>
  );
}

export default FormInserimento;
