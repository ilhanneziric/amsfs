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
    let nizID = [];
    let bezZauzetihTermina = [];
    let praviTermini = [];
    const [ptretmani, setPTretmani] = useState([]);

    const dispatch = useDispatch();

    useEffect(async () => {
        const result = await axios(`https://amsfs.herokuapp.com/api/termin/dan/${params.danid}`);
        const finaly = setujZadnjiTermin(await result.data);
        setZTermini(finaly);
        const resultt = await axios(`https://amsfs.herokuapp.com/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, []);

    const setujZadnjiTermin = (data) => {
        data.push({
            sat: 22,
            minuta: 0,
            tretman: '621d3490539d77816329b4a4'
        });
        return data;
    }

    useEffect(async() => {
        for (let i = 0; i < ztermini.length; i++) {
            
            const resultt = await axios(`https://amsfs.herokuapp.com/api/tretman/${ztermini[i].tretman}`);
            tretmani.push(resultt.data);
        }
        setSveTermine(tretman.trajanje/10);
        dispatch(updateUrlParams({ id: 5, spol: (tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko'), kategorija: tretman.kategorija, tretmanid: params.tretmanid, danid: params.danid, minuta:"", sat:"", ime:"", telefon:""}));
    }, [ztermini, tretman]);

    const setSveTermine = (trajanjTermina) => {
        for (let i = 9; i <= 21; i++) {
            for (let j = 0; j < 60; j+=10) {
                sviTermini.push({sat: i, minuta: j});
            }
        }
        sviTermini.push({sat: 22, minuta:0})
        setReverseTermine(trajanjTermina);
        setSveTermineBezZauzetih();
        setpraviTermini();
    }

    const setReverseTermine = (trajanje) => {
        reverseTermini = sviTermini.slice();
        reverseTermini.reverse();
        if(trajanje > -1){
            for (let k = 0; k < reverseTermini.length; k++) {
                for (let z = 0; z < ztermini.length; z++) {
                    if(poredjenjeTermina(reverseTermini[k], ztermini[z])){
                        let pomocniNiz = [...reverseTermini];
                        nizID.push([...pomocniNiz.splice(k, trajanje)]);
                    }                
                }            
            }   
            for (let x = 0; x < reverseTermini.length; x++) {
                for (let y = 0; y < nizID.length; y++) {
                    for (let z = 0; z < nizID[y].length; z++) {
                        // if(poredjenjeTermina(reverseTermini[x], nizID[y][z])){
                        //     reverseTermini.splice(x,1);
                        // }
                        reverseTermini = reverseTermini.filter(ter => !(poredjenjeTermina(ter, nizID[y][z])));
                    }                    
                }                
            }
            // console.log(reverseTermini);
        }
        reverseTermini.reverse();
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
