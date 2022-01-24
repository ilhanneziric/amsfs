import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

import TretmanKartica from "../components/TretmanKartica";
import NatragBtn from "../components/NatragBtn";

const TretmanScreen = () => {
    const params = useParams();
    const [tretmani,setTretmani] = useState([]);

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/tretman/kategorija/${params.id}`);
        setTretmani(result.data);
    }, []);

    // console.log(tretmani);
    const tDatum = new Date();
    const bla = {
        broj: tDatum.getMonth() + 1,
        godina: tDatum.getFullYear()
    };
    return (
        <div className="body">
            

            <div className="naslov">
                {
                    params.id === "kz" || params.id === "sz" || params.id === "dz" ? 
                    <Link to='/kategorija/zensko'><NatragBtn/></Link>: 
                    <Link to='/kategorija/musko'><NatragBtn/></Link>
                }
            <div className="wizard">
                <Link to='/'><div className="dugme prosla">1</div></Link>
                <div className="linija proslalinija"></div>
                {
                    params.id === "kz" || params.id === "sz" || params.id === "dz" ? 
                    <Link to='/kategorija/zensko'><div className="dugme prosla">2</div></Link>: 
                    <Link to='/kategorija/musko'><div className="dugme prosla">2</div></Link>
                }
                
                <div className="linija proslalinija"></div>
                <div className="dugme prosla">3</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">4</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">5</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">6</div>
                <div className="linija"></div>
                <div className="dugme nijeprosla">7</div>
            </div>
                <h4>ODABERITE TRETMAN<hr className="crta" /></h4>
            </div>



            {tretmani.map((tretman) => (
                <Link to={`/kalendar/${tretman._id}/${tretman.kategorija}`} key={tretman._id}>
                    <TretmanKartica key={tretman._id} naslov={tretman.naslov} opis={tretman.opis === '' ? '' : tretman.opis} trajanje={tretman.trajanje} cijena={tretman.cijena}/>
                </Link>
            ))}
        </div>
    )
}

export default TretmanScreen
