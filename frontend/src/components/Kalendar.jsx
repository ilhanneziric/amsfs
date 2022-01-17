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
            {/* <MjesecSwitcher mjesec={sadasnji} /> */}
            <div className="bodyKalendar">
                {
                    prosli.reverse().map((d,index)=>(<DanKartica key={index} broj={d.broj} disabled={d.disabled}/>))
                }
                {
                    sadasnji.map((d) => (<Link to={`/termin/${d._id}/${params.id}`} key={d._id}><DanKartica broj={d.broj} disabled={d.disabled}/></Link>))
                }
                {
                    buduci.map((d, index)=>(<DanKartica key={index + 10000} broj={d.broj} disabled={d.disabled}/>))
                }
            </div>
        </div>
    )
}

export default Kalendar
