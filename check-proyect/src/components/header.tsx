import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import userIcon from '../assets/icons/user.svg'
import ajustesIcon from '../assets/icons/setings.svg'
import inventarioIcon from '../assets/icons/inventory.svg'
import usuariosIcon from '../assets/icons/users.svg'
import barCodeIcon from '../assets/icons/barcorder.svg'
import logoutIcon from '../assets/icons/logout.svg'
import { isAuthenticated, getUser, logout } from '../services/auth';
import '../styles/header.css'

const navItems = [
    { to: "/ajustes", icon: ajustesIcon, label: "Ajustes" },
    { to: "/inventario", icon: inventarioIcon, label: "Inventario" },
    { to: "/usuarios", icon: usuariosIcon, label: "Usuarios" },
    { to: "/", icon: barCodeIcon, label: "Código de Barras" },
];

function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());
    const [user, setUser] = useState(getUser());

    function handleLogout() {
        logout();
        setLoggedIn(false);
        setUser(null);
        window.location.reload();
        navigate("/");
    }

    return (
        <header>
            <div className='container header'>
                <div className='row align-items-center'>
                    <div className='col d-flex justify-content-start'>
                        <h1>Check-In</h1>
                    </div>
                    <div className='col d-flex justify-content-center gap-2'>
                        {loggedIn && navItems.map(({ to, icon, label }) => (
                            <Link
                                key={to}
                                to={to}
                                className={`nav-icon${location.pathname === to ? ' active' : ''}`}
                            >
                                <img className='button-icon' src={icon} alt={label} />
                                <span>{label}</span>
                            </Link>
                        ))}
                    </div>
                    <div className='col d-flex justify-content-end'>
                        {loggedIn ? (
                            <div className='header-user'>
                                <img className="button-icon" src={userIcon} alt="Usuario" />
                                <p>{user?.sub || user?.user_name || ""}</p>
                                <button className="btn btn-link p-0 ms-2" onClick={handleLogout}>
                                    <img className='button-icon' src={logoutIcon} alt="Cerrar sesión" />
                                </button>
                            </div>
                        ) : (
                            <Link to="/login" className="nav-icon">
                                <img className="button-icon" src={userIcon} alt="Iniciar sesión" />
                                <span>Ingresar</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;
