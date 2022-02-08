import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";

const PotvrdaScreen = () => {
    const params = useParams();
    const [dan, setDan] = useState({});
    const [tretman, setTretman] = useState({});
    const [mjesec, setMjesec] = useState({});
    const [spol, setSpol] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(async() => {
        const result = await axios(`http://localhost:5000/api/dan/${params.danid}`);
        setDan(result.data);
        const resultt = await axios(`http://localhost:5000/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, [])

    useEffect(async() => {
        const result = await axios(`http://localhost:5000/api/mjesec/${dan.mjesec}`);
        setMjesec(result.data);
    }, [dan]);

    const dispatch = useDispatch();
    useEffect(() => {
        setSpol(tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko');
        dispatch(updateUrlParams({ 
            id: 7, 
            spol: spol, 
            kategorija: tretman.kategorija, 
            tretmanid: params.tretmanid, 
            danid: params.danid, 
            minuta: params.minuta, 
            sat: params.sat, 
            ime: params.ime, 
            telefon: params.telefon
        }));
    }, [tretman]);
    return (
        <div className="body">


            <div className="naslov">
                <Link to={`/unos/${params.sat}/${params.minuta}/${params.danid}/${params.tretmanid}`}><NatragBtn/></Link>
                <Wizard/>
               
                <h4>POTVRDITE REZERVACIJU<hr className="crta" /></h4>
                <div className="bodyPotvrda">
                    <h1 className="potvrdaNaslov">Vaša rezervacija:</h1>
                    <p className="potvrdaItem"><b>Datum:</b> {dan.broj}.{mjesec.broj}.{mjesec.godina}.</p>
                    <p className="potvrdaItem"><b>Vrijeme:</b> {params.sat}:{params.minuta === "0" ? "00" : params.minuta}</p>
                    <p className="potvrdaItem"><b>Tretman:</b> {tretman.naslov}</p>
                    <p className="potvrdaItem"><b>Trajanje tretmana:</b> {tretman.trajanje}min</p>
                    <p className="potvrdaItem"><b>Cijena tretmana:</b> {tretman.cijena}KM</p>
                    <p className="potvrdaItem"><b>Ime i prezime:</b> {params.ime}</p>
                    <p className="potvrdaItem"><b>Telefon:</b> {params.telefon}</p>
                    {/* <p className="potvrdaItem"><b>Napomena:</b> Ovo je napomena</p>     ovo uraditi kada budem setovo redux      */}
                    <div onClick={handleShow} className="userpotvrdabtn">POTVRDI</div>
                </div>
                <Modal show={show} onHide={handleClose} backdrop="static" centered={true}>
                    <Modal.Header>
                        {/* <Modal.Title>Ovo je naslov</Modal.Title> */}
                    </Modal.Header>
                    <div className="modalBody">
                        <p className="potvrdaItemModal">Zahtjev za rezervaciju je uspješno poslan salonu.</p> 
                        <p className="potvrdaItemModal">Kada neko iz salona prihvati ili odbije rezervaciju</p>
                        <p className="potvrdaItemModal">vi ćete dobiti SMS poruku o prihvatanju/odbijanju.</p>
                    </div>
                    <Modal.Footer className="modalFooter">
                        <Link to={'/'}><div className="usermodalbtn">OK</div></Link>
                    </Modal.Footer>
                </Modal>
            </div>
            <br/> 
        </div>   
    )
}

export default PotvrdaScreen
