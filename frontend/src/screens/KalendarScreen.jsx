import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import DanKartica from "../components/DanKartica";
import MjesecSwitcher from "../components/MjesecSwitcher";
import NatragBtn from "../components/NatragBtn";
import Kalendar from "../components/Kalendar";


const KalendarScreen = () => {
    const datum = new Date();
    const datumce = {
        broj: datum.getMonth() + 1,
        godina: datum.getFullYear()
    };
    const [mjesec, setMjesec] = useState({ _id: "61e0d0a4dd71e30d38629992",broj: datum.getMonth() +1, godina: datum.getFullYear() });
    // const [mjesec, setMjesec] = useState({});
    const [dani,setDani] = useState([]);
    const [lijevo,setLijevo] = useState({});
    const [desno, setDesno] = useState();
    let mojMjesece;

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${datumce.broj}/${datumce.godina}`);
        setMjesec(result.data);
        // const rezultat = await axios(`http://localhost:5000/api/dan/mjesec/${result.data._id}`);
        // setDani(rezultat.data);
    }, [mojMjesece]);
    mojMjesece = mjesec;
    // useEffect(async () => {
    //     const rezultat = await axios(`http://localhost:5000/api/dan/mjesec/${mjesec._id}`);
    //     setDani(rezultat.data);
    // }, [mjesec]);

    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${datum.getMonth() + 1}/${datum.getFullYear()}`);
    //     setMjesec(result.data);
    // }, []);

    const setujLijevo = () => {
        setMjesec(lijevo);
        mojMjesece = lijevo;
    };
    const setujDesno = () => {
        setMjesec(desno);
        mojMjesece = desno;
    };

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
        setDesno(result.data);
        const rezultat = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
        setLijevo(rezultat.data);
        const rezultatd = await axios(`http://localhost:5000/api/dan/mjesec/${mjesec._id}`);
        setDani(rezultatd.data);
    }, [mojMjesece]);

    let prosliMjesec = [];
    for (let i = 0; i < mjesec.pocetniDan; i++) {
        prosliMjesec.push({broj: 31-i, disabled: "true"});
    }
    prosliMjesec = prosliMjesec.reverse();
    let buduciMjesec = [];
    for (let i = 1; i <= (42 - (dani.length + mjesec.pocetniDan)); i++) {
        buduciMjesec.push({broj: i, disabled: "true"});
    }

    
    return (
        <div className="body">
            <div className="naslov">
                <Link to='/tretman/sz'><NatragBtn/></Link>
                <h1 className="">Odaberite dan u kojem želite rezervisati termin<hr className="crta" /></h1>
            </div>
            <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>
            <Kalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec}/>
            <br />
        </div>
    )
}

export default KalendarScreen
