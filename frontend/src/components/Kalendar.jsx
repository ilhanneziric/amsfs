import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import DanKartica from "../components/DanKartica";
import MjesecSwitcher from "./MjesecSwitcher";


const Kalendar = ( {prosli, sadasnji, buduci}) => {
    const params = useParams();
    // const [dani,setDani] = useState([]);
    // const [mjesec, setMjesec] = useState({});

    // const [prosliMjesec,setProsliMjesec] = useState([{broj:0, godina:0}]);

    //sa params
    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${Number(params.broj)}/${Number(params.godina)}`);
    //     setMjesec(result.data);
    // }, []);
    
    //ovo je radilo
    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${datum.getMonth() + 1}/${datum.getFullYear()}`);
    //     setMjesec(result.data);
    //     const rezultat = await axios(`http://localhost:5000/api/dan/mjesec/${result.data._id}`);
    //     setDani(rezultat.data);
    // }, []);
    
    //zaseban poziv
    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/dan/mjesec/${mjesec._id === undefined ? "61e0d0a4dd71e30d38629992" : mjesec._id}`);
    //     setDani(result.data);
    // }, []);
        
    //prosliMjesec kao state
    // useEffect(() => {
    //     console.log(mjesec.pocetniDan);
    //     for (let i = 0; i < mjesec.pocetniDan; i++) {
    //         setProsliMjesec(...prosliMjesec, {broj: 31-i, disabled: "true"});
    //     }
    // }, []);

    //ovo je radilo
    // let prosliMjesec = [];
    // for (let i = 0; i < mjesec.pocetniDan; i++) {
    //     prosliMjesec.push({broj: 31-i, disabled: "true"});
    // }

    // let buduciMjesec = [];
    // for (let i = 1; i <= (42 - (dani.length + mjesec.pocetniDan)); i++) {
    //     buduciMjesec.push({broj: i, disabled: "true"});
    // }

    return (
        <div>
            <div className="bodyKalendar">
                <div className="nazivDana">PON</div>
                <div className="nazivDana">UTO</div>
                <div className="nazivDana">SRI</div>
                <div className="nazivDana">ČET</div>
                <div className="nazivDana">PET</div>
                <div className="nazivDana">SUB</div>
                <div className="nazivDana">NED</div>
                {
                    prosli.reverse().map((d,index)=>(<DanKartica key={index} broj={d.broj} disabled={d.disabled} neaktuelni="true"/>))
                }
                {
                    sadasnji.map((d) => (
                        d.disabled === "true" ? 
                        <DanKartica key={d._id} broj={d.broj} disabled={d.disabled} neaktuelni="false"/>:
                        <Link to={`/termin/${d._id}/${params.tretmanid}`} key={d._id}><DanKartica broj={d.broj} disabled={d.disabled} neaktuelni="false"/></Link>
                        ))
                }
                {
                    buduci.map((d, index)=>(<DanKartica key={index + 10000} broj={d.broj} disabled={d.disabled} neaktuelni="true"/>))
                }
            </div>
        </div>
    )
}

export default Kalendar
