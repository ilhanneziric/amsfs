import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import DanKartica from "../components/DanKartica";


const Kalendar = ( {prosli, sadasnji, buduci}) => {
    const params = useParams();
    const [mjesec, setMjesec] = useState({});

    const datum = new Date();
    const datumce = {
        trenutniMjesec: datum.getMonth() + 1,
        trenutniDan: datum.getDate()
    };

    useEffect(async () => {
        if(sadasnji.length > 0){
            const result = await axios(`http://localhost:5000/api/mjesec/${sadasnji[0].mjesec}`);
            setMjesec(result.data);
        }
    }, [sadasnji]);

    return (
        <div>
            <div className="bodyKalendar">
                <div className="nazivDana">PON</div>
                <div className="nazivDana">UTO</div>
                <div className="nazivDana">SRI</div>
                <div className="nazivDana">ČET</div>
                <div className="nazivDana">PET</div>
                <div className="nazivDana">SUB</div>
                <div className="nazivDana">NED</div>
                {
                    prosli.reverse().map((d,index)=>(<DanKartica key={index} broj={d.broj} disabled={d.disabled} neaktuelni="true"/>))
                }
                {
                    mjesec.broj < datumce.trenutniMjesec?

                    sadasnji.map((d) => (
                        <DanKartica key={d._id} broj={d.broj} disabled={'true'} neaktuelni="false"/>
                    )):

                    sadasnji.map((d) => (
                        d.broj <= datumce.trenutniDan?
                        <DanKartica key={d._id} broj={d.broj} disabled={'true'} neaktuelni="false"/>:
                        d.disabled === "true" ? 
                        <DanKartica key={d._id} broj={d.broj} disabled={d.disabled} neaktuelni="false"/>:
                        <Link to={`/termin/${d._id}/${params.tretmanid}`} key={d._id}><DanKartica broj={d.broj} disabled={d.disabled} neaktuelni="false"/></Link>
                    ))
                }
                {
                    buduci.map((d, index)=>(<DanKartica key={index + 10000} broj={d.broj} disabled={d.disabled} neaktuelni="true"/>))
                }
            </div>
        </div>
    )
}

export default Kalendar
