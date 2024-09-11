import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const FindHolidays = () => {
  const [formData, setFormData] = useState({
    year: "",
  });
  const [holidaysData, setHolidaysData] = useState(null);
  const [holidaysError, setHolidaysError] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://localhost:7273/Holiday/${formData.year}`)
      .then((response) => {
        console.log(response.data);
        if (response.data !== "Ano inválido ou dados não encontrados.") {
          setHolidaysError(null);
          setHolidaysData(response.data);
        }
      })
      .catch((error) => {
        setHolidaysData(null);
        setHolidaysError("Ano inválido ou dados não encontrados.");
        console.error("Erro ao enviar dados", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>Ano:</label>
        <input
          type="text"
          name="year"
          value={formData.year}
          onChange={handleChange}
        />
        <button type="submit">Buscar Feriados</button>
      </form>

      {holidaysError && (
        <div style={{ textAlign: "center" }}>
          <h1>{holidaysError}</h1>
        </div>
      )}

      {holidaysData && (
        <div className="data-section">
          <h2>Feriados</h2>
          <div className="holiday-list">
            {holidaysData.map((holiday, index) => (
              <div className="holiday-card" key={index}>
                <p>
                  <strong>Data:</strong> {holiday.data}
                </p>
                <p>
                  <strong>Nome:</strong> {holiday.nome}
                </p>
                <p>
                  <strong>Tipo:</strong> {holiday.tipo}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FindHolidays;
