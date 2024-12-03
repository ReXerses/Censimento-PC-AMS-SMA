import logoAMS from '/src/assets/ams.png'
import logoSMA from '/src/assets/sma.png'
import stile from '/src/moduliCSS/Navbar.module.css'

const Navbar = () => {
    return (
        <nav>
            <div className="contenitoreLogo">
                <img className={stile.logo} src={logoAMS} alt="logo_AMS"  />
            </div>
            <h1 className={stile.titolo}>ASSET IT</h1>
            <div className="contenitoreLogo">
            <img className={stile.logo}  src={logoSMA} alt="logo_SMA"  />
            </div>
        </nav>
    )
}

export default Navbar;