import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import { useSelector, useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";

const UnosScreen = () => {
    const params = useParams();
    const {register, handleSubmit, formState: { errors }} = useForm();
    let navigate = useNavigate();
    const [tretman,setTretman] = useState({});
    const [spol, setSpol] = useState('');

    useEffect(async () => {
        const resultt = await axios(`http://localhost:5000/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, []);

    const onSubmit = (data) => {
        navigate(`/potvrda/${params.sat}/${params.minuta}/${params.danid}/${params.tretmanid}/${data.ime}/${data.telefon}`);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        setSpol(tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko');
        dispatch(
            updateUrlParams(
                { id: 6, spol: spol, kategorija: tretman.kategorija, tretmanid: params.tretmanid, danid: params.danid, minuta: params.minuta, sat: params.sat, ime:"", telefon:""}
                ));
    }, [tretman]);

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
