import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";

import MjesecSwitcher from "../components/MjesecSwitcher";
import NatragBtn from "../components/NatragBtn";
import Kalendar from "../components/Kalendar";
import Wizard from "../components/Wizard";

const KalendarScreen = () => {
    const params = useParams();
    const [mjesec, setMjesec] = useState({});
    const [dani,setDani] = useState([]);
    const [lijevo,setLijevo] = useState({});
    const [desno, setDesno] = useState();
    const [spol, setSpol] = useState(params.kategorija === "kz" || params.kategorija === "sz" || params.kategorija === "dz" ? 'zensko': 'musko');
    
    const datum = new Date();
    const datumce = {
        broj: datum.getMonth() + 1,
        godina: datum.getFullYear()
    };

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateUrlParams({ id: 4, spol: spol, kategorija: params.kategorija, tretmanid: params.tretmanid, danid:"", minuta:"", sat:"", ime:"", telefon:""}));
    }, [])

    useEffect(async () => {
        const result = await axios(`https://amsfs.vercel.app/api/mjesec/${datumce.broj}/${datumce.godina}`);
        setMjesec(result.data);
        setujDane(result.data._id);
    }, []);

    const setujDane = async(id) => {
        const rezultat = await axios(`https://amsfs.vercel.app/api/dan/mjesec/${id}`);
        setDani(rezultat.data);
    }

    useEffect(async () => {
        const result = await axios(`https://amsfs.vercel.app/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
        setDesno(result.data);
        const rezultat = await axios(`https://amsfs.vercel.app/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
        setLijevo(rezultat.data);
    }, [mjesec]);

    let prosliMjesec = [];
    for (let i = 0; i < mjesec.pocetniDan; i++) {
        if(mjesec.broj === 1){
            prosliMjesec.push({broj: (new Date(mjesec.godina - 1, 12, 0).getDate())-i, disabled: "true"});
        }else{
            prosliMjesec.push({broj: (new Date(mjesec.godina, mjesec.broj - 1, 0).getDate())-i, disabled: "true"});
        }
    }
    prosliMjesec = prosliMjesec.reverse();

    let buduciMjesec = [];
    for (let i = 1; i <= (42 - (dani.length + mjesec.pocetniDan)); i++) {
        buduciMjesec.push({broj: i, disabled: "true"});
    }

    const setujLijevo = () => {
        setMjesec(lijevo);
        setujDane(lijevo._id);
    };
    const setujDesno = () => {
        setMjesec(desno);
        setujDane(desno._id);
    };
    return (
        <div className="body">
            <div className="naslov">
                <Link to={`/tretman/${params.kategorija}`}><NatragBtn/></Link>
                <Wizard/>
                <h4>ODABERITE DAN U KOJEM ŽELITE REZERVISATI TERMIN<hr className="crta" /></h4>
            </div>
            <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>,
            <Kalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec}/>
            <br />
        </div>
    )
}

export default KalendarScreen
