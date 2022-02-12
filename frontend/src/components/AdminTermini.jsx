import '../components/styles/adminHome.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

const AdminKalendar = ({ime, tretmanID, sat, minuta}) => {
  const [tretman, setTretman] = useState();
  useEffect(async() => {
    const result = await axios(`http://localhost:5000/api/tretman/${tretmanID}`);
    setTretman(result.data);
  }, [])
  return (
    <div className='bodyAdminTerminKartice'>
        <div className="lijevoAdmin">
            <div className="imeMusterije">{ime}</div>
            {
                tretman !== undefined && <div className="nazivTretmana">{tretman.naslov}</div>
            }
        </div>
        <div className="desnoAdmin">{sat}:{minuta == "0" ? "00" : minuta}</div>
    </div>
  );
};

export default AdminKalendar;
