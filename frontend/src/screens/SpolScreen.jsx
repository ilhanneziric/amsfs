import { Link } from "react-router-dom"


import Kartica from '../components/Kartica';
import Wizard from "../components/Wizard";
import muskoIcon from '../icons/musIcon.png';
import zenskoIcon from '../icons/zenIcon.png';

const SpolScreen = () => {
    return (
        <div className="body">
            {/* <Wizard/> */}
            <div className="wizard">
                <div className="dugme prosla">1</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">2</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">3</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">4</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">5</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">6</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">7</div>
            </div>
            
            <div className="naslov">
                <h4>REZERVIŠITE TERMIN ZA...<hr className="crta" /></h4>
            </div>
            <div className="kartice">
                <Link to='/kategorija/zensko'><Kartica imageURL={zenskoIcon} naslov="ŽENSKO"/></Link>
                <Link to='/kategorija/musko'><Kartica imageURL={muskoIcon} naslov="MUŠKO"/></Link>
            </div>
        </div>
    )
}

export default SpolScreen

