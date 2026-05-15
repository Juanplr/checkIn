import { useState } from "react";
import Header from "../components/Header";
import codigoBarraIcon from '../assets/icons/barcorder.svg'
import loginIcon from '../assets/icons/login.svg'
import { isAuthenticated } from "../services/auth";
function Principal() {

  const [codigoBarras, setCodigoBarras] = useState("");
  const loggedIn = isAuthenticated();

  return (
    <>
      <Header />

      <div className="container justify-content-center align-items-center d-flex flex-column">
        <div>
          <h2>Escanea el producto</h2>
        </div>
        <div>
          <input type="number" placeholder="Código de barras" min="0"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
          />
          <button className="btn btn-primary">
            <img className="button-icon" src={codigoBarraIcon} alt="Código de barras" />
          </button>
        </div>
        {
          !loggedIn && (
            <a href="/login">Iniciar Sesión<img src={loginIcon} alt="Iniciar sesión" /></a>
          )
        }
      </div>
    </>
  );
}

export default Principal;