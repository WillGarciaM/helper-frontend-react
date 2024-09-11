import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const FindCnpj = () => {
  const [formData, setFormData] = useState({
    cnpj: "",
  });
  const [cnpjData, setCnpjData] = useState(null);
  const [cnpjError, setCnpjError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://localhost:7273/Cnpj/${formData.cnpj}`)
      .then((response) => {
        console.log(response.data);

        if (response.data.data_inicio_atividade !== null) {
          setCnpjError(null);
          setCnpjData(response.data);
        } else {
          setCnpjData(null);
          setCnpjError("CNPJ Inválido ou Não encontrado");
        }
      })
      .catch((error) => {
        console.error("Erro ao enviar dados", error);
      });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label>CNPJ:</label>
        <input
          type="text"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
        />
        <button type="submit">Buscar CNPJ</button>
      </form>

      {cnpjError && (
        <div style={{ textAlign: "center" }}>
          <h1>{cnpjError}</h1>
        </div>
      )}

      {cnpjData && (
        <div className="data-section">
          <h2>Informações do CNPJ</h2>
          <p>
            <strong>Razão Social:</strong> {cnpjData.razao_social}
          </p>
          <p>
            <strong>Nome Fantasia:</strong> {cnpjData.nome_fantasia}
          </p>
          <p>
            <strong>UF:</strong> {cnpjData.uf}
          </p>
          <p>
            <strong>Município:</strong> {cnpjData.municipio}
          </p>
          <p>
            <strong>Logradouro:</strong> {cnpjData.logradouro},{" "}
            {cnpjData.numero} - {cnpjData.bairro}
          </p>
          <p>
            <strong>CEP:</strong> {cnpjData.cep}
          </p>
          <p>
            <strong>Capital Social:</strong> R$ {cnpjData.capital_social}
          </p>

          <h3>QSA (Quadro Societário)</h3>
          <ul>
            {cnpjData.qsa.map((socio, index) => (
              <li key={index}>
                <p>
                  <strong>Nome:</strong> {socio.nome_socio}
                </p>
                <p>
                  <strong>Qualificação:</strong> {socio.qualificacao_socio}
                </p>
                <p>
                  <strong>Faixa Etária:</strong> {socio.faixa_etaria}
                </p>
              </li>
            ))}
          </ul>

          <h3>CNAEs Secundários</h3>
          <ul>
            {cnpjData.cnaes_secundarios.map((cnae, index) => (
              <li key={index}>
                <p>
                  <strong>Código:</strong> {cnae.codigo}
                </p>
                <p>
                  <strong>Descrição:</strong> {cnae.descricao}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FindCnpj;
