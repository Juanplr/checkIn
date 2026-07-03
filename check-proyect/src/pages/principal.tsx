import { useState } from "react";
import Header from "../components/Header";
import BarcodeScanner from "react-qr-barcode-scanner";
import cameraIcon from '../assets/icons/camera.svg'
import loginIcon from '../assets/icons/login.svg'
import { isAuthenticated } from "../services/auth";
import { getProductoByBarcode } from "../services/producto";
import type { Producto } from "../models/Producto";
import ProductoCard from "../components/ProductoCard";

type View = "scan" | "result" | "idle";

function Principal() {
  const [codigo, setCodigo] = useState("");
  const [view, setView] = useState<View>("idle");
  const [producto, setProducto] = useState<Producto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const loggedIn = isAuthenticated();

  function handleScan(err: unknown, result?: { getText: () => string } | null) {
    if (result) {
      const code = result.getText();
      setCodigo(code);
      setView("idle");
      buscarProducto(code);
    }
  }

  async function buscarProductoAutomaticamente(key: string) {
    if (key === "Enter") {
      buscarProducto();
    }
    if (codigo.length >= 13) {
      buscarProducto();
    }
  }

  async function buscarProducto(codigoBarras?: string) {
    const code = codigoBarras || codigo;
    if (!code) return;

    setLoading(true);
    setError("");
    setProducto(null);

    try {
      const data = await getProductoByBarcode(code);
      setProducto(data);
      setView("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error del servidor");
      
      setView("idle");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <div className="container d-flex flex-column align-items-center py-4 gap-3">

        {view === "scan" && (
          <div className="scanner-container" style={{ maxWidth: 500, width: "100%" }}>
            <BarcodeScanner
              width={500}
              height={400}
              onUpdate={handleScan}
            />
            <button
              className="btn btn-danger mt-2 w-100"
              onClick={() => setView("idle")}
            >
              Cancelar
            </button>
          </div>
        )}

        <div className="d-flex gap-2 w-100" style={{ maxWidth: 500 }}>
          <input
            type="number"
            className="form-control form-control-lg"
            placeholder="Código de barras"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyUp={(e) => buscarProductoAutomaticamente(e.key)}
          /> 
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => setView("scan")}
          >
            <img className="button-icon" src={cameraIcon} alt="Escanear" />
          </button>
        </div>

        {loading && (
          <div className="text-center">
            <div className="spinner-border text-light" role="status" />
            <p className="mt-2">Buscando producto...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger w-100" style={{ maxWidth: 500 }}>
            {error}
          </div>
        )}

        {producto && view === "result" && (
          <ProductoCard
            producto={producto}
            onReset={() => { setProducto(null); setView("idle"); setCodigo(""); }}
          />
        )}

        {!loggedIn && view === "idle" && (
          <a href="/login" className="mt-3">
            Iniciar Sesión
            <img className="ms-2" src={loginIcon} alt="Iniciar sesión" />
          </a>
        )}

      </div>
    </>
  );
}

export default Principal;
