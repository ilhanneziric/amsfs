import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import DanKartica from "../components/DanKartica";
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

    const datum = new Date();
    const datumce = {
        broj: datum.getMonth() + 1,
        godina: datum.getFullYear()
    };

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${datumce.broj}/${datumce.godina}`);
        setMjesec(result.data);
        setujDane(result.data._id);
    }, []);

    const setujDane = async(id) => {
        const rezultat = await axios(`http://localhost:5000/api/dan/mjesec/${id}`);
        setDani(rezultat.data);
    }

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
        setDesno(result.data);
        const rezultat = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
        setLijevo(rezultat.data);
    }, [mjesec]);

    let prosliMjesec = [];
    for (let i = 0; i < mjesec.pocetniDan; i++) {
        prosliMjesec.push({broj: 31-i, disabled: "true"});
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
                <div className="wizard">
                    <Link to='/'><div className="dugme prosla">1</div></Link>
                    <div className="linija proslalinija"></div>
                    {
                        params.kategorija === "kz" || params.kategorija === "sz" || params.kategorija === "dz" ? 
                        <Link to='/kategorija/zensko'><div className="dugme prosla">2</div></Link>: 
                        <Link to='/kategorija/musko'><div className="dugme prosla">2</div></Link>
                    }


                    <div className="linija proslalinija"></div>
                    <Link to={`/tretman/${params.kategorija}`}> <div className="dugme prosla">3</div></Link>


                    <div className="linija proslalinija"></div>
                    <div className="dugme prosla">4</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">5</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">6</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">7</div>
                </div>
                <h4>ODABERITE DAN U KOJEM ŽELITE REZERVISATI TERMIN<hr className="crta" /></h4>
            </div>
            <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>,
            <Kalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec}/>
            <br />
        </div>
    )
}

export default KalendarScreen
