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
                <h1 className="">Odaberite tretman<hr className="crta" /></h1>
            </div>



            {tretmani.map((tretman) => (
                <Link to={`/kalendar/${tretman._id}`} key={tretman._id}>
                    <TretmanKartica key={tretman._id} naslov={tretman.naslov} opis={tretman.opis === '' ? '' : tretman.opis} trajanje={tretman.trajanje} cijena={tretman.cijena}/>
                </Link>
            ))}

            {/* <button><Link to='/kalendar'>dalje</Link></button>
            <button><Link to='/kategorija'>nazad</Link></button> */}
        </div>
    )
}

export default TretmanScreen
