import '../components/styles/adminHome.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

const AdminKalendar = ({termin, diskriminator, izbrisiZahtjev, prihvatiZahtjev}) => {
  const [tretman, setTretman] = useState();
  useEffect(async() => {
    const result = await axios(`http://localhost:5000/api/tretman/${termin.tretman}`);
    setTretman(result.data);
  }, []);

  return (
    <div className='bodyAdminTerminKartice'>
        <div className="lijevoAdmin">
            <div className="imeMusterije">{termin.ime}</div>
            {
                tretman !== undefined && <div className="nazivTretmana">{tretman.naslov}</div>
            }
        </div>
        {
          diskriminator === 1?
          <div className="desnoAdmin">{termin.sat}:{termin.minuta == "0" ? "00" : termin.minuta}</div>:
          <div className='desnoAdminStrihiri'>
            <div className='strihir' onClick={() => prihvatiZahtjev(termin)}>&#10003;</div>
            <div className='strihir' onClick={() => izbrisiZahtjev(termin._id)}>&#10007;</div>
          </div>
        }
    </div>
  );
};

export default AdminKalendar;
