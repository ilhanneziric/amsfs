import { Link } from "react-router-dom"
import { useDispatch} from 'react-redux';

import Kartica from '../components/Kartica';
import Wizard from "../components/Wizard";
import muskoIcon from '../icons/musIcon.png';
import zenskoIcon from '../icons/zenIcon.png';

import { updateUrlParams } from "../redux/actions/urlParamsActions";
import { useEffect } from "react";

const SpolScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateUrlParams({ id: 1, spol:"", kategorija:"", tretmanid:"", danid:"", minuta:"", sat:"", ime:"", telefon:""}));
    }, [])
    return (
        <div className="body">
            
            <div className="naslov">
            <Wizard/>
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

