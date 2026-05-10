import Header from "../components/Header";
import { useState } from "react";

function Login() {

    const api = import.meta.env.VITE_URL_API;

    const ruta = `${api}/usuario/login`;

    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");

    async function handleClick(event: React.FormEvent) {

        event.preventDefault();

        try {

            const response = await fetch(
                `${ruta}/${correo}/${contrasena}`
            );

            if (response.ok) {

                const data = await response.json();

                console.log(data);

                alert(
                    data.nombre +
                    " - Inicio de sesión exitoso"
                );

            } else {

                console.error("Error al obtener los datos");

                alert("Error al iniciar sesión");
            }

        } catch (error) {

            console.error(error);

            alert("Error del servidor");
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
                            htmlFor="email"
                            className="form-label"
                        >
                            Correo Electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Ingresa tu correo electrónico"
                            value={correo}
                            onChange={(e) =>
                                setCorreo(e.target.value)
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

                <a href="">Registrarse</a>

            </div>
        </>
    );
}

export default Login;