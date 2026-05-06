import Header from "../components/header"

function Login(){

    return(
        <>
            <Header/>
            <div className="container">
                <form action="">
                    <h2>Ingresar al Sistema</h2>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" placeholder="Ingresa tu correo electrónico" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="password" placeholder="Ingresa tu contraseña" />
                    </div>
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
                <a href="">Registrarse</a>
            </div>
        </>
    );

}

export default Login