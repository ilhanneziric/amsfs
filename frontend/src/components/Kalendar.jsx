import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import DanKartica from "../components/DanKartica";
import MjesecSwitcher from "./MjesecSwitcher";


const Kalendar = ( {prosli, sadasnji, buduci}) => {
    const params = useParams();
    // console.log(sadasnji);
    // const [dani,setDani] = useState([]);
    const [mjesec, setMjesec] = useState({});

    const datum = new Date();
    const datumce = {
        trenutniMjesec: datum.getMonth() + 1,
        trenutniDan: datum.getDate()
    };
    // const [prosliMjesec,setProsliMjesec] = useState([{broj:0, godina:0}]);

    //sa params
    useEffect(async () => {
        if(sadasnji.length > 0){
            const result = await axios(`http://localhost:5000/api/mjesec/${sadasnji[0].mjesec}`);
            setMjesec(result.data);
            // console.log(result.data, datumce.trenutniMjesec, datumce.trenutniDan);
        }
    }, [sadasnji]);
    
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
                    mjesec.broj < datumce.trenutniMjesec?

                    sadasnji.map((d) => (
                        <DanKartica key={d._id} broj={d.broj} disabled={'true'} neaktuelni="false"/>
                    )):

                    sadasnji.map((d) => (
                        d.broj <= datumce.trenutniDan?
                        <DanKartica key={d._id} broj={d.broj} disabled={'true'} neaktuelni="false"/>:
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
