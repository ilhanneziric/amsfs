import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import { useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";
import { updNapomena } from '../redux/actions/napomenaActions';

const UnosScreen = () => {
    const params = useParams();
    const {register, handleSubmit, formState: { errors }} = useForm();
    let navigate = useNavigate();
    const [tretman,setTretman] = useState({});

    useEffect(async () => {
        const resultt = await axios(`https://amsfs.vercel.app/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, []);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(
            updateUrlParams(
                { id: 6, spol: (tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko'), kategorija: tretman.kategorija, tretmanid: params.tretmanid, danid: params.danid, minuta: params.minuta, sat: params.sat, ime:"", telefon:""}
                ));
    }, [tretman]);

    const onSubmit = (data) => {
        navigate(`/potvrda/${params.sat}/${params.minuta}/${params.danid}/${params.tretmanid}/${data.ime}/${data.telefon}`);
        dispatch(updNapomena(data.napomena));
    };


    return (
        <div className="body">


            <div className="naslov">
                <Link to={`/termin/${params.danid}/${params.tretmanid}`}><NatragBtn/></Link>
                <Wizard/>
                
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
