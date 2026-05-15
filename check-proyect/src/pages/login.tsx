import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [contrasena, setContrasena] = useState("");

    async function handleClick(event: React.FormEvent) {

        event.preventDefault();

        try {

            await login(username, contrasena);

            alert("Inicio de sesión exitoso");

            navigate("/");

        } catch (error) {

            console.error(error);

            alert(error instanceof Error ? error.message : "Error del servidor");
        }
    }

    return (
        <>
            <Header />

            <div className="container">

                <form onSubmit={handleClick}>

                    <h2>Ingresar al Sistema</h2>

                    <div className="mb-3">

                        <label
                            htmlFor="username"
                            className="form-label"
                        >
                            Nombre de Usuario
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Ingresa tu nombre de usuario"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>

                    <div className="mb-3">

                        <label
                            htmlFor="password"
                            className="form-label"
                        >
                            Contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Ingresa tu contraseña"
                            value={contrasena}
                            onChange={(e) =>
                                setContrasena(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Iniciar Sesión
                    </button>

                </form>

            </div>
        </>
    );
}

export default Login;