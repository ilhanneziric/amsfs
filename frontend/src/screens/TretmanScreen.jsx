import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";

import TretmanKartica from "../components/TretmanKartica";
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

const TretmanScreen = () => {
    const params = useParams();
    const [tretmani,setTretmani] = useState([]);
    const [spol, setSpol] = useState(params.kategorija === "kz" || params.kategorija === "sz" || params.kategorija === "dz" ? 'zensko': 'musko');

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateUrlParams({ id: 3, spol: spol, kategorija: params.kategorija, tretmanid:"", danid:"", minuta:"", sat:"", ime:"", telefon:""}));
    }, [])

    useEffect(async () => {
        const result = await axios(`https://amsfs.herokuapp.com/api/tretman/kategorija/${params.kategorija}`);
        setTretmani(result.data);
    }, []);

    const tDatum = new Date();
    return (
        <div className="body">
            

            <div className="naslov">
                <Link to={`/kategorija/${spol}`}><NatragBtn/></Link>
                <Wizard/>
                
                <h4>ODABERITE TRETMAN<hr className="crta" /></h4>
            </div>



            {tretmani.map((tretman) => (
                <Link to={`/kalendar/${tretman._id}/${tretman.kategorija}`} key={tretman._id}>
                    <TretmanKartica key={tretman._id} naslov={tretman.naslov} opis={tretman.opis === '' ? '' : tretman.opis} trajanje={tretman.trajanje} cijena={tretman.cijena}/>
                </Link>
            ))}
        </div>
    )
}

export default TretmanScreen
