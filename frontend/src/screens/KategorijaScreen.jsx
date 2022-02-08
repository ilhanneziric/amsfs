import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import Kartica from '../components/Kartica';
import kratkaM from '../icons/muskeFrizure/kratkaM.png';
import srednjaM from '../icons/muskeFrizure/srednjaM.png';
import dugaM from '../icons/muskeFrizure/dugaM.png';
import kratkaZ from '../icons/zenskeFrizure/kratkaZ.png';
import srednjaZ from '../icons/zenskeFrizure/srednjaZ.png';
import dugaZ from '../icons/zenskeFrizure/dugaZ.png';

import { useSelector, useDispatch} from 'react-redux';
import { useEffect } from "react";
import { updateUrlParams } from "../redux/actions/urlParamsActions";

const KategorijaScreen = () => {
    const params = useParams();
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateUrlParams({ id: 2, spol: params.spol, kategorija:"", tretmanid:"", danid:"", minuta:"", sat:"", ime:"", telefon:""}));
    }, [])
    return (
        <div className="body">
            

        <div className="naslov">
            <Link to='/'><NatragBtn className="ulijevo"/></Link>
            <Wizard/>
            
            <h4>ODABERITE VELIČINU VAŠE KOSE<hr className="crta" /></h4>
        </div>
        <div className="kartice">
            {params.spol === "musko" &&  <Link to='/tretman/km'><Kartica imageURL={kratkaM} naslov="KRATKA KOSA"/></Link>}
            {params.spol === "musko" &&  <Link to='/tretman/sm'><Kartica imageURL={srednjaM} naslov="SREDNJA KOSA"/></Link>}
            {params.spol === "musko" &&  <Link to='/tretman/dm'><Kartica imageURL={dugaM} naslov="DUGA KOSA"/></Link>}

            {params.spol === "zensko" &&  <Link to='/tretman/kz'><Kartica imageURL={kratkaZ} naslov="KRATKA KOSA"/></Link>}
            {params.spol === "zensko" &&  <Link to='/tretman/sz'><Kartica imageURL={srednjaZ} naslov="SREDNJA KOSA"/></Link>}
            {params.spol === "zensko" &&  <Link to='/tretman/dz'><Kartica imageURL={dugaZ} naslov="DUGA KOSA"/></Link>}   
        </div>
    </div>
    )
}

export default KategorijaScreen
