import React, { useState } from "react";

const EditPopup = ({ pc, onSave, onCancel }) => {
  const [editedPC, setEditedPC] = useState(pc);

  // Gestisce i cambiamenti dei campi principali
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPC((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gestisce i cambiamenti nei campi annidati (es. array di oggetti)
  const handleNestedChange = (key, index, field, value) => {
    setEditedPC((prev) => ({
      ...prev,
      [key]: prev[key].map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  // Aggiunge un nuovo elemento a un array
  const addItem = (key, newItem) => {
    setEditedPC((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), newItem],
    }));
  };

  // Rimuove un elemento da un array
  const removeItem = (key, index) => {
    setEditedPC((prev) => ({
      ...prev,
      [key]: prev[key].filter((_, i) => i !== index),
    }));
  };

  // Salva le modifiche
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedPC);
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h3>Modifica Dati</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input
              type="text"
              name="dipendente"
              value={editedPC.dipendente || ""}
              onChange={handleChange}
            />
          </label>

          <h4>Computers:</h4>
          {editedPC.computers?.map((computer, index) => (
            <div key={index}>
              <label>
                Modello PC:
                <input
                  type="text"
                  value={computer.modelloPc || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "computers",
                      index,
                      "modelloPc",
                      e.target.value
                    )
                  }
                />
              </label>
              <label>
                MAC Address:
                <input
                  type="text"
                  value={computer.MAC || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "computers",
                      index,
                      "MAC",
                      e.target.value
                    )
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem("computers", index)}
              >
                Rimuovi
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addItem("computers", {
                modelloPc: "",
                MAC: "",
                CPU: "",
                GPU: "",
                RAM: "",
              })
            }
          >
            Aggiungi Computer
          </button>

          <h4>Smartphone/Tablet:</h4>
          {editedPC.smart_tablets?.map((tablet, index) => (
            <div key={index}>
              <label>
                Modello:
                <input
                  type="text"
                  value={tablet.modelloS_T || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "smart_tablets",
                      index,
                      "modelloS_T",
                      e.target.value
                    )
                  }
                />
              </label>
              <label>
                MAC Address:
                <input
                  type="text"
                  value={tablet.MAC || ""}
                  onChange={(e) =>
                    handleNestedChange(
                      "smart_tablets",
                      index,
                      "MAC",
                      e.target.value
                    )
                  }
                />
              </label>
              <button
                type="button"
                onClick={() => removeItem("smart_tablets", index)}
              >
                Rimuovi
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              addItem("smart_tablets", { modelloS_T: "", MAC: "", seriale: "" })
            }
          >
            Aggiungi Smartphone/Tablet
          </button>

          <button type="submit">Salva</button>
          <button type="button" onClick={onCancel}>
            Annulla
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPopup;
