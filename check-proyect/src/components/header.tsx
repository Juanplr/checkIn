import { useState } from 'react'
import userIcon from '../assets/icons/user.svg'
import ajustesIcon from '../assets/icons/setings.svg'
import inventarioIcon from '../assets/icons/inventory.svg'
import usuariosIcon from '../assets/icons/users.svg'
import barCodeIcon from '../assets/icons/barcorder.svg'
import logoutIcon from '../assets/icons/logout.svg'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, getUser, logout } from '../services/auth';

function Header() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getUser());

    function handleLogout() {
        logout();
        setLoggedIn(false);
        setUser(null);
        navigate("/");
    }

    return (
        <>
            <header>
                <div className='container header '>
                    <div className='row align-items-center'>
                        <div className='col d-flex justify-content-start'>
                            <h1>Check-In</h1>
                        </div>
                        <div className='iconos col d-flex justify-content-between'>
                            {
                                loggedIn && (
                                    <>
                                        <Link to="/ajustes">
                                            <img className='button-icon' src={ajustesIcon} alt="Ajustes" />
                                        </Link>
                                        <Link to="/inventario">
                                            <img className='button-icon' src={inventarioIcon} alt="Inventario" />
                                        </Link>
                                        <Link to="/usuarios">
                                            <img className='button-icon' src={usuariosIcon} alt="Usuarios" />
                                        </Link>
                                        <Link to="/">
                                            <img className='button-icon' src={barCodeIcon} alt="Código de Barras" />
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                        <div className='usuario col d-flex justify-content-end'>
                            {
                                loggedIn ? (
                                    <>
                                        <img className="button-icon" src={userIcon} alt="Usuario" />
                                        <p>{user?.sub || user?.user_name || ""}</p>
                                        <button className="btn btn-link p-0 ms-2" onClick={handleLogout}>
                                            <img className='button-icon' src={logoutIcon} alt="Cerrar sesión" />
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login">
                                        <img className="button-icon" src={userIcon} alt="Iniciar sesión" />
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;