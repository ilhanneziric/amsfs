import '../components/styles/adminHome.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

const AdminKalendar = ({termin, diskriminator, izbrisiZahtjev, prihvatiZahtjev, otvoriModal}) => {
  const [tretman, setTretman] = useState();
  useEffect(async() => {
    const result = await axios(`https://amsfs.vercel.app/api/tretman/${termin.tretman}`);
    setTretman(result.data);
  }, []);

  return (
    <div className='bodyAdminTerminKartice'>
        <div className="lijevoAdmin" onClick={() => otvoriModal(termin)}>
            <div className="imeMusterije">{termin.ime}</div>
            {
                tretman !== undefined && <div className="nazivTretmana">{tretman.naslov}</div>
            }
        </div>
        {
          diskriminator === 1?
          <div className="desnoAdmin" onClick={() => otvoriModal(termin)}>{termin.sat}:{termin.minuta == "0" ? "00" : termin.minuta}</div>:
          <div className='desnoAdminStrihiri'>
            <div className='strihir' onClick={() => prihvatiZahtjev(termin)}>&#10003;</div>
            <div className='strihir' onClick={() => izbrisiZahtjev(termin._id)}>&#10007;</div>
          </div>
        }
    </div>
  );
};

export default AdminKalendar;
