import { Link, useParams} from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import TerminKartica from "../components/TerminKartica";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
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

    console.log(ptretmani);
    return (
        <div className="body">


            <div className="naslov">
                <Link to={`/kalendar/${params.tretmanid}/${tretman.kategorija}`}><NatragBtn/></Link>
                <div className="wizard">
                    <Link to='/'><div className="dugme prosla">1</div></Link>
                    <div className="linija proslalinija"></div>

                    {
                        tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 
                        <Link to='/kategorija/zensko'><div className="dugme prosla">2</div></Link>: 
                        <Link to='/kategorija/musko'><div className="dugme prosla">2</div></Link>
                    }
                    
                    <div className="linija proslalinija"></div>
                    <Link to={`/tretman/${tretman.kategorija}`}> <div className="dugme prosla">3</div></Link>
                    
                    <div className="linija proslalinija"></div>
                    <Link to={`/kalendar/${params.tretmanid}/${tretman.kategorija}`}><div className="dugme prosla">4</div></Link>
                    <div className="linija proslalinija"></div>
                    <div className="dugme prosla">5</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">6</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">7</div>
                </div>
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
