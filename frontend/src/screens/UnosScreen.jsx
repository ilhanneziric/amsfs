import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router';


const UnosScreen = () => {
    const params = useParams();
    const {register, handleSubmit, formState: { errors }} = useForm();
    let navigate = useNavigate();

    const onSubmit = (data) => {
        navigate(`/potvrda/${params.sat}/${params.minuta}/${params.danid}/${params.tretmanid}/${data.ime}/${data.telefon}`);
    };
    return (
        <div className="body">
            <div className="naslov">
                <Link to={`/termin/${params.danid}/${params.tretmanid}`}><NatragBtn/></Link>
                <h1 className="">Unesite podatke<hr className="crta" /></h1>
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
