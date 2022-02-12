import { Link, useParams} from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import TerminKartica from "../components/TerminKartica";
import { useState, useEffect} from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";
const {poredjenjeTermina} = require('../funkcije');


const TerminScreen = () => {
    const params = useParams();
    const [ztermini,setZTermini] = useState([]);
    const [tretman,setTretman] = useState({});
    let sviTermini = [];
    let tretmani = [];
    let reverseTermini = [];
    let bezZauzetihTermina = [];
    let praviTermini = [];
    const [ptretmani, setPTretmani] = useState([]);
    const [spol, setSpol] = useState('');

    const dispatch = useDispatch();
    useEffect(() => {
        setSpol(tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko');
        dispatch(updateUrlParams({ id: 5, spol: spol, kategorija: tretman.kategorija, tretmanid: params.tretmanid, danid: params.danid, minuta:"", sat:"", ime:"", telefon:""}));
    }, [tretman]);

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/termin/dan/${params.danid}`);
        setZTermini(result.data);
        const resultt = await axios(`http://localhost:5000/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, []);
    useEffect(async() => {
        for (let i = 0; i < ztermini.length; i++) {
            
            const resultt = await axios(`http://localhost:5000/api/tretman/${ztermini[i].tretman}`);
            tretmani.push(resultt.data);
        }
        setSveTermine(tretman.trajanje/10);
    }, [ztermini, tretman]);

    const setSveTermine = (trajanjTermina) => {
        for (let i = 9; i <= 21; i++) {
            for (let j = 0; j < 60; j+=10) {
                sviTermini.push({sat: i, minuta: j});
            }
        }
        setReverseTermine(trajanjTermina);
        setSveTermineBezZauzetih();
        setpraviTermini();
    }

    const setSveTermineBezZauzetih = () => {
        bezZauzetihTermina = sviTermini.slice();
        for (let k = 0; k < bezZauzetihTermina.length; k++) {
            for (let z = 0; z < ztermini.length; z++) {
                if(poredjenjeTermina(bezZauzetihTermina[k], ztermini[z])){
                    bezZauzetihTermina.splice(k, (tretmani[z].trajanje / 10)); 
                    z=ztermini.length;
                    k=-1;
                }                
            }            
        }
    }

    const setReverseTermine = (trajanje) => {
        reverseTermini = sviTermini.slice();
        reverseTermini.reverse();
        if(trajanje > -1){
            for (let k = 0; k < reverseTermini.length; k++) {
                for (let z = 0; z < ztermini.length; z++) {
                    if(poredjenjeTermina(reverseTermini[k], ztermini[z])){
                        reverseTermini.splice(k, trajanje);
                        z=ztermini.length;
                        k=-1;
                    }                
                }            
            }   
        }
        reverseTermini.reverse();
    }

    const setpraviTermini = () => {
        for (let r = 0; r < bezZauzetihTermina.length; r++) {
            for (let t = 0; t < reverseTermini.length; t++) {
                if(poredjenjeTermina(bezZauzetihTermina[r], reverseTermini[t])){
                    praviTermini.push(bezZauzetihTermina[r]);
                }                
            }    
        }
        setPTretmani(praviTermini);
    }

    return (
        <div className="body">


            <div className="naslov">
                <Link to={`/kalendar/${params.tretmanid}/${tretman.kategorija}`}><NatragBtn/></Link>
                <Wizard/>
                
                <h4>ODABERITE VRIJEME TERMINA<hr className="crta" /></h4>
                <div className="bodyTermini">
                    {
                        ptretmani.map((t, index) => (
                            <Link to={`/unos/${t.sat}/${t.minuta}/${params.danid}/${params.tretmanid}`} key={index}>
                                <TerminKartica termin = {t}/>
                            </Link>
                        ))

                    }
                </div>
            </div>
            <br/>
        </div>
    )
}

export default TerminScreen
