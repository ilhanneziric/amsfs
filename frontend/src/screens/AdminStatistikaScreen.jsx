import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import { FaArrowLeft } from "react-icons/fa";
import MjesecSwitcher from "../components/MjesecSwitcher";
import AdminKalendar from "../components/AdminKalendar";
import AdminStatistika from "../components/AdminStatistika";
import '../components/styles/adminHome.scss';

const AdminStatistikaScreen = () => {
  const datum = new Date();
  const datumce = {
      broj: datum.getMonth() + 1,
      godina: datum.getFullYear()
  };

  const [mjesec, setMjesec] = useState({});
  const [dani,setDani] = useState([]);
  const [lijevo,setLijevo] = useState({});
  const [desno, setDesno] = useState();


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
        <div className="adminHomePage">
            <div className="AdminDugmiciFullWidth">
            <Link to='/admin'><div className="adminDugme statistikaNatragBtn"><FaArrowLeft className="faAdminStrelica"/>NAZAD</div></Link>
            </div>
            <div className="lijevoKalendar">
                <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>
                <AdminKalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec} diskriminator = {2}/>
            </div>
            <div className="desnoTermini">
                <AdminStatistika/>
            </div>
                
        </div>
  )
}

export default AdminStatistikaScreen