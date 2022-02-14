import './styles/mjesecSwitcher.scss';

import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const {getMonthName} = require('../funkcije');

const MjesecSwitcher = ({lijevo, desno, mjesec, setujLijevo, setujDesno}) => {
    
    return (
        <div className='bodySwitcher'>
            {
                lijevo === "nema" ? <div className="strelica sDisabled"><FaArrowLeft/></div> : <div className="strelica" onClick={setujLijevo}><FaArrowLeft/></div>                
            }
            <div className="nazivMjeseca">{getMonthName(mjesec.broj)}</div>
            
            {
                desno === "nema" ? <div className="strelica sDisabled"><FaArrowRight/></div> : <div className="strelica" onClick={setujDesno}><FaArrowRight/></div>
            }
        </div>
    )
}

export default MjesecSwitcher
