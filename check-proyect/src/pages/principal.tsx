import { useState } from "react";
import Header from "../components/Header";
import codigoBarraIcon from '../assets/icons/barcorder.svg'
import loginIcon from '../assets/icons/login.svg'
function Principal() {
  
  const [codigoBarras, setCodigoBarras] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Header />

      <div className="container justify-content-center align-items-center d-flex flex-column">
        <div>
          <h2>Escanea el producto</h2>
        </div>
        <div>
          <input type="number" placeholder="Código de barras" min="0" />
          <button className="btn btn-primary">
            <img className="button-icon" src={codigoBarraIcon} alt="Código de barras" />
          </button>
        </div>
        <div>
          {
            !isLoggedIn && (
              <a href="/login">Iniciar Sesión<img src={loginIcon} alt="Iniciar sesión" /></a>
            )
          }
        </div>
      </div>
    </>
  );
}

export default Principal;