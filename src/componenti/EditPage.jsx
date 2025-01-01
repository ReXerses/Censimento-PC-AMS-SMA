import React, { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PcContext } from '/src/PcContext.jsx';

const EditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pcData, updatePc } = useContext(PcContext);
  
  const pcToEdit = pcData.find(pc => pc.id === id);
  const [formData, setFormData] = useState(pcToEdit || {});

  if (!pcToEdit) {
    return <p>PC non trovato!</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (index, arrayName, field, value) => {
    const updatedArray = [...formData[arrayName]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const addArrayItem = (arrayName, newItem) => {
    const updatedArray = [...(formData[arrayName] || []), newItem];
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const removeArrayItem = (arrayName, index) => {
    const updatedArray = formData[arrayName].filter((_, i) => i !== index);
    setFormData({ ...formData, [arrayName]: updatedArray });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePc(formData);
    navigate('/');
  };

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
      <h1>Modifica Dipendente</h1>
      <form onSubmit={handleSubmit}>
        {/* Campi principali */}
        <label className='labels'>
          Nome Dipendente:
          <input 
            type="text" 
            name="dipendente" 
            value={formData.dipendente || ''} 
            onChange={handleChange} 
          />
        </label>
        <label className='labels'>
          Azienda:
          <input 
            type="text" 
            name="azienda" 
            value={formData.azienda || ''} 
            onChange={handleChange} 
          />
        </label>
        <label className='labels'>
          Mansione:
          <input 
            type="text" 
            name="mansione" 
            value={formData.mansione || ''} 
            onChange={handleChange} 
          />
        </label>

        {/* Computers */}
        <h2>Computers</h2>
        {formData.computers?.map((computer, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <label className='labels'>
              Modello PC:
              <input 
                type="text" 
                value={computer.modelloPc || ''} 
                onChange={(e) => handleArrayChange(index, 'computers', 'modelloPc', e.target.value)} 
              />
            </label>
            <label className='labels'>
              CPU:
              <input 
                type="text" 
                value={computer.CPU || ''} 
                onChange={(e) => handleArrayChange(index, 'computers', 'CPU', e.target.value)} 
              />
            </label>
            <label className='labels'>
              RAM:
              <input 
                type="text" 
                value={computer.RAM || ''} 
                onChange={(e) => handleArrayChange(index, 'computers', 'RAM', e.target.value)} 
              />
            </label>
            <label className='labels'>
              Posizione:
              <input 
                type="text" 
                value={computer.posizioneMacchina || ''} 
                onChange={(e) => handleArrayChange(index, 'computers', 'posizioneMacchina', e.target.value)} 
              />
            </label>
            <button type="button" onClick={() => removeArrayItem('computers', index)}>Rimuovi PC</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('computers', { modelloPc: '', CPU: '', RAM: '', posizioneMacchina: '' })}>
          Aggiungi PC
        </button>

        {/* Smart Tablets */}
        <h2>Smart Tablets</h2>
        {formData.smart_tablets?.map((tablet, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <label className='labels'>
              Modello:
              <input 
                type="text" 
                value={tablet.modelloS_T || ''} 
                onChange={(e) => handleArrayChange(index, 'smart_tablets', 'modelloS_T', e.target.value)} 
              />
            </label>
            <label className='labels'>
              Seriale:
              <input 
                type="text" 
                value={tablet.seriale || ''} 
                onChange={(e) => handleArrayChange(index, 'smart_tablets', 'seriale', e.target.value)} 
              />
            </label>
            <button type="button" onClick={() => removeArrayItem('smart_tablets', index)}>Rimuovi Tablet</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('smart_tablets', { modelloS_T: '', seriale: '' })}>
          Aggiungi Tablet
        </button>

        {/* Schede SIM */}
        <h2>Schede SIM</h2>
        {formData.schedeSIM?.map((sim, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <label className='labels'>
              Numero:
              <input 
                type="text" 
                value={sim.numero || ''} 
                onChange={(e) => handleArrayChange(index, 'schedeSIM', 'numero', e.target.value)} 
              />
            </label>
            <label className='labels'>
              PIN:
              <input 
                type="text" 
                value={sim.pin || ''} 
                onChange={(e) => handleArrayChange(index, 'schedeSIM', 'pin', e.target.value)} 
              />
            </label>
            <button type="button" onClick={() => removeArrayItem('schedeSIM', index)}>Rimuovi SIM</button>
          </div>
        ))}
        <button type="button" onClick={() => addArrayItem('schedeSIM', { numero: '', pin: '' })}>
          Aggiungi SIM
        </button>

        <button type="submit">Salva Modifiche</button>
      </form>
    </div>
  );
};

export default EditPage;
