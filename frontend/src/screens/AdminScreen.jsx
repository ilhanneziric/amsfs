import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector} from 'react-redux';

import { FaArrowRight } from "react-icons/fa";
import MjesecSwitcher from "../components/MjesecSwitcher";
import AdminKalendar from "../components/AdminKalendar";
import AdminTermini from "../components/AdminTermini";
import '../components/styles/adminHome.scss';


const AdminScreen = () => {
    const datum = new Date();
    const datumce = {
        broj: datum.getMonth() + 1,
        godina: datum.getFullYear()
    };

    const [mjesec, setMjesec] = useState({});
    const [dani,setDani] = useState([]);
    const [lijevo,setLijevo] = useState({});
    const [desno, setDesno] = useState();
    const [termini, setTermini] = useState(null);
    const [cekiran, setCekiran] = useState(false);

    const adminDan = useSelector(state => state.adminDan);

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/termin/dan/${adminDan}`);
        setTermini(result.data);
    }, [adminDan]);

    useEffect(() => {
        for (let i = 0; i < dani.length; i++) {
            if(dani[i]._id == adminDan){
                setCekiran((dani[i].disabled == 'true'? true:false));
            }
        }
    }, [adminDan]);

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

    const setujCekiranje = (e) => {
        for (let i = 0; i < dani.length; i++) {
            if(dani[i]._id == adminDan){
                const updateuj = async()=>{
                    let obj = {
                        broj: dani[i].broj,
                        disabled: (dani[i].disabled === 'true'? 'false': 'true'),
                        mjesec: dani[i].mjesec
                    };
                    const result = await axios.patch(`http://localhost:5000/api/dan/${dani[i]._id}`,obj);
                    await setujDane(dani[i].mjesec);
                    console.log(result);
                    setCekiran(!cekiran);
                }
                updateuj();
            }
        }
    }
    return( 
    <div className="adminHomePage">
        <div className="AdminDugmiciFullWidth">
            <Link to='/admin/statistika'><div className="adminDugme">STATISTIKA<FaArrowRight className="faAdminStrelica"/></div></Link>
        </div>
        <div className="AdminDugmiciFullWidth">
        <Link to='/admin/tretmani'><div className="adminDugme">TRETMANI<FaArrowRight className="faAdminStrelica"/></div></Link>
        </div>
        <div className="lijevoKalendar">
            <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>
            <AdminKalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec} diskriminator = {1}/>
        </div>
        <div className="desnoTermini">

            <div className="danSwitcher">
                <h4 className="switcherLabel">RADNI DAN: </h4> 
                <label className="switch">
                    <input type="checkbox" onChange={(e) => setujCekiranje(e)} checked={!cekiran}/>
                    <span className="slider round"></span>
                </label>
            </div>

            <div className="adminTerminiBlok">
            {
               adminDan !== '' && termini !== null && termini.length !== undefined &&
               termini.map((d, index)=>(<AdminTermini key={index} tretmanID={d.tretman} ime={d.ime} sat={d.sat} minuta={d.minuta}/>))
               //<Loader/>
                
            }
            </div>
            
        </div>
    </div>);
};

export default AdminScreen;
