import { Link } from "react-router-dom"


import Kartica from '../components/Kartica';
import muskoIcon from '../icons/musIcon.png';
import zenskoIcon from '../icons/zenIcon.png';

const SpolScreen = () => {
    return (
        <div className="body">
            <div className="naslov">
                <h1>Rezervišite termin za...<hr className="crta" /></h1>
            </div>
            <div className="kartice">
                <Link to='/kategorija/zensko'><Kartica imageURL={zenskoIcon} naslov="ŽENSKO"/></Link>
                <Link to='/kategorija/musko'><Kartica imageURL={muskoIcon} naslov="MUŠKO"/></Link>
            </div>
        </div>
    )
}

export default SpolScreen

