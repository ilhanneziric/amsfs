import './styles/mjesecSwitcher.scss';
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const getMonthName = require('../funkcije');

const MjesecSwitcher = ({lijevo, desno, mjesec, setujLijevo, setujDesno}) => {
    
    const params = useParams();
    // const [lijevo,setLijevo] = useState({});
    // const [desno, setDesno] = useState();

    //zajedno
    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
    //     setDesno(result.data);
    //     const rezultat = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
    //     setLijevo(rezultat.data);
    // }, [mjesec]);

    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
    //     setDesno(result.data);
    // }, []);

    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
    //     setLijevo(result.data);
    // }, []);

    // //sa params
    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${Number(params.broj) === 12 ? Number(Number(params.broj) - 11) : Number(Number(params.broj) + 1)}/${Number(params.broj) === 12 ? Number(Number(params.godina) + 1) : Number(params.godina)}`);
    //     setDesno(result.data);
    // }, []);

    // useEffect(async () => {
    //     const result = await axios(`http://localhost:5000/api/mjesec/${Number(params.broj) === 1 ? Number(Number(params.broj) + 11 ) : Number(Number(params.broj) - 1)}/${Number(params.broj) === 1 ? Number(Number(params.godina) - 1) : Number(params.godina)}`);
    //     setLijevo(result.data);
    // }, []);
    // console.log(lijevo);
    // console.log(desno);

    return (
        <div className='bodySwitcher'>
            {
                lijevo === "nema" ? <div className="strelica sDisabled"><FaArrowLeft/></div> : <div className="strelica" onClick={setujLijevo}><FaArrowLeft/></div>
                // lijevo === "nema" ? 
                // <div className="strelica sDisabled"><FaArrowLeft/></div> : 
                // <Link to={`/kalendar/${params.id}/${lijevo.broj}/${lijevo.godina}`}>
                //     <div className="strelica"><FaArrowLeft/></div>
                // </Link>
                
            }
            <div className="nazivMjeseca">{getMonthName(mjesec.broj)}</div>
            
            {
                desno === "nema" ? <div className="strelica sDisabled"><FaArrowRight/></div> : <div className="strelica" onClick={setujDesno}><FaArrowRight/></div>
                // desno === "nema" ? 
                // <div className="strelica sDisabled"><FaArrowRight/></div> :
                // <div className="strelica"><FaArrowRight/></div> 
                
                // <Link to={`/kalendar/${params.id}/${desno.broj}/${desno.godina}`}>
                //     <div className="strelica"><FaArrowRight/></div>
                // </Link>

                // <Link to={`/kalendar/${params.id}/2/2022`}>
                //     <div className="strelica"><FaArrowRight/></div>
                // </Link>
                
                // <Link to={`/tretman/61e060100709c252560b8e08`}>
                //     <div className="strelica"><FaArrowRight/></div>
                // </Link>
            }
        </div>
    )
}

export default MjesecSwitcher
