import Header from "../components/header";
import codigoBarraIcon from '../assets/icons/barcorder.svg'
function Principal() {
  return (
    <>
      <Header />
      <div className="container justify-content-center align-items-center d-flex flex-column">
        <div>
          <h2>Escanea el producto</h2>
        </div>
        <div>
          <label>Codigo de Barra</label>
          <img className="button-icon" src={codigoBarraIcon} alt="Código de barras" />
        </div>
        <div>
          <a href="">IniciarSession <img src="" alt="" /></a>
        </div>
      </div>
    </>
  );
}

export default Principal;