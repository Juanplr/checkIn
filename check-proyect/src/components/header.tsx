import userIcon from '../assets/icons/user.svg'
import ajustesIcon from '../assets/icons/setings.svg'
import inventarioIcon from '../assets/icons/inventory.svg'
import usuariosIcon from '../assets/icons/users.svg'
import barCodeIcon from '../assets/icons/barcorder.svg'

function Header() {
    return (
        <>
            <header>
                <div className='container header '>
                    <div className='row align-items-center'>
                        <div className='col d-flex justify-content-start'>
                            <h1>Check-In</h1>
                        </div>
                        <div className='iconos col d-flex justify-content-between'>
                            <img className='button-icon' src={ajustesIcon} alt="Ajustes" />
                            <img className='button-icon' src={inventarioIcon} alt="Inventario" />
                            <img className='button-icon' src={usuariosIcon} alt="Usuarios" />
                            <img className='button-icon' src={barCodeIcon} alt="Código de Barras" />
                        </div>
                        <div className='usuario col d-flex justify-content-end'>
                            <img className="button-icon" src={userIcon} alt="Usuario" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;