import './styles/wizard.scss';
import { Link } from "react-router-dom"
import { useSelector} from 'react-redux';

const Wizard = () => {
  const urlParams = useSelector(state => state.urlParams);

  return (
    <div className="wizard">
        {/* spol */}
        <Link to='/'><div className="dugme prosla">1</div></Link>
        
        {/* kategorija */}
        {
          urlParams.id >= 2 ?
          <><div className="linija proslalinija"></div><Link to={`/kategorija/${urlParams.spol}`}><div className="dugme prosla">2</div></Link></>:
          <><div className="linija"></div><div className="dugme nijeprosla">2</div></>
        }

        {/* tretman */}
        {
          urlParams.id >= 3 ?
          <><div className="linija proslalinija"></div><Link to={`/tretman/${urlParams.kategorija}`}> <div className="dugme prosla">3</div></Link></>:
          <><div className="linija"></div><div className="dugme nijeprosla">3</div></>
        }

        {/* kalendar */}
        {
          urlParams.id >= 4 ?
          <><div className="linija proslalinija"></div><Link to={`/kalendar/${urlParams.tretmanid}/${urlParams.kategorija}`}><div className="dugme prosla">4</div></Link></>:
          <><div className="linija"></div><div className="dugme nijeprosla">4</div></>
        }

        {/* termin */}
        {
          urlParams.id >= 5 ?
          <><div className="linija proslalinija"></div><Link to={`/termin/${urlParams.danid}/${urlParams.tretmanid}`}><div className="dugme prosla">5</div></Link></>:
          <><div className="linija"></div><div className="dugme nijeprosla">5</div></>
        }

        {/* unos */}
        {
          urlParams.id >= 6 ?
          <><div className="linija proslalinija"></div><Link to={`/unos/${urlParams.sat}/${urlParams.minuta}/${urlParams.danid}/${urlParams.tretmanid}`}><div className="dugme prosla">6</div></Link></>:
          <><div className="linija"></div><div className="dugme nijeprosla">6</div></>
        }

        {/* potvrda */}        
        {
          urlParams.id >= 7 ?
          <><div className="linija proslalinija"></div><div className="dugme prosla">7</div></>:
          <><div className="linija"></div><div className="dugme nijeprosla">7</div></>
        }
    </div>
  );
};

export default Wizard;
