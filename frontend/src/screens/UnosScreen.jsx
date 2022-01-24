import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { useState, useEffect, useRef} from "react";
import axios from "axios";


const UnosScreen = () => {
    const params = useParams();
    const {register, handleSubmit, formState: { errors }} = useForm();
    let navigate = useNavigate();
    const [tretman,setTretman] = useState({});
    useEffect(async () => {
        const resultt = await axios(`http://localhost:5000/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, []);

    const onSubmit = (data) => {
        navigate(`/potvrda/${params.sat}/${params.minuta}/${params.danid}/${params.tretmanid}/${data.ime}/${data.telefon}`);
    };


    return (
        <div className="body">


            <div className="naslov">
                <Link to={`/termin/${params.danid}/${params.tretmanid}`}><NatragBtn/></Link>
                <div className="wizard">
                    <Link to='/'><div className="dugme prosla">1</div></Link>
                    <div className="linija proslalinija"></div>
                    
                    {
                        tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 
                        <Link to='/kategorija/zensko'><div className="dugme prosla">2</div></Link>: 
                        <Link to='/kategorija/musko'><div className="dugme prosla">2</div></Link>
                    }
                    
                    <div className="linija proslalinija"></div>
                    <Link to={`/tretman/${tretman.kategorija}`}> <div className="dugme prosla">3</div></Link>

                    <div className="linija proslalinija"></div>
                    <Link to={`/kalendar/${params.tretmanid}/${tretman.kategorija}`}><div className="dugme prosla">4</div></Link>

                    <div className="linija proslalinija"></div>
                    <Link to={`/termin/${params.danid}/${params.tretmanid}`}><div className="dugme prosla">5</div></Link>
                    <div className="linija proslalinija"></div>
                    <div className="dugme prosla">6</div>
                    <div className="linija"></div>
                    <div className="dugme nijeprosla">7</div>
                </div>
                <h4 className="">UNESITE PODATKE<hr className="crta" /></h4>
                <div className="bodyTermini">

                    <form className="userUnosForma" onSubmit={handleSubmit(onSubmit)}>

                        <div className="jedaninput">
                            <label htmlFor="ime" className="userlbl">Ime i prezime:</label>
                            <input placeholder="Mujo Mujić" {...register("ime", { validate: (value) => value !== ""})} className="userinput"/>
                                {errors.ime && <p className="usererr">Morate unijeti ime i prezime</p>}
                        </div>

                        <div className="jedaninput">
                            <label htmlFor="telefon" className="userlbl">Telefon:</label>
                            <input placeholder="061222333" {...register("telefon", { validate: (value) => value !== ""})} className="userinput"/>
                                {errors.telefon && <p className="usererr">Morate unijeti broj telefona</p>}
                        </div>
                        
                        <div className="jedaninput">
                            <label htmlFor="napomena" className="userlbl">Napomena: (nije obavezno)</label>
                            <textarea {...register("napomena", { validate: (value) => value === value})} className="userinput"/>
                                {/* {errors.napomena && <p>Morate unijeti broj telefona</p>} */}
                        </div>
                        <input type="submit" className="userbtn" value={"DALJE"}/>
                        
                    </form>
                </div>
            </div>
            <br/> 
        </div>   
        
    )
}

export default UnosScreen
