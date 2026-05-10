import { useState } from 'react'
import userIcon from '../assets/icons/user.svg'
import ajustesIcon from '../assets/icons/setings.svg'
import inventarioIcon from '../assets/icons/inventory.svg'
import usuariosIcon from '../assets/icons/users.svg'
import barCodeIcon from '../assets/icons/barcorder.svg'
import { Link } from 'react-router-dom'
import Usuario from '../models/Usuario';

function Header() {
    const usuario = new Usuario();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(usuario);
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
                                isLoggedIn && (
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
                                isLoggedIn && (
                                    <>
                                        <img className="button-icon" src={userIcon} alt="Usuario" />
                                        <p>{user.user_name}</p>
                                    </>
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