import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import NatragBtn from "../components/NatragBtn";
import Wizard from "../components/Wizard";

import { Modal } from 'react-bootstrap';
import { useSelector, useDispatch} from 'react-redux';
import { updateUrlParams } from "../redux/actions/urlParamsActions";
import socket from '../Socket.js'
const {getTretmanKategorijaName} = require('../funkcije');

const PotvrdaScreen = () => {
    const params = useParams();
    const [dan, setDan] = useState({});
    const [tretman, setTretman] = useState({});
    const [mjesec, setMjesec] = useState({});
    const napomena = useSelector(state => state.napomena);
        
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const potvrda = () => {
        setShow(true);
        const noviTermin = {
            sat: params.sat,
            minuta: params.minuta,
            ime: params.ime,
            telefon: params.telefon,
            napomena: napomena,
            isPrihvacen: false,
            dan: params.danid,
            tretman: params.tretmanid
        };
        const  posalji = async (obj) => {
            const response = await axios.post('https://amsfs.vercel.app/api/termin/', obj);
            socket.emit('posalji_zahtjev');
        }
        posalji(noviTermin);
    }

    useEffect(async() => {
        const result = await axios(`https://amsfs.vercel.app/api/dan/${params.danid}`);
        setDan(result.data);
        const resultt = await axios(`https://amsfs.vercel.app/api/tretman/${params.tretmanid}`);
        setTretman(resultt.data);
    }, [])

    useEffect(async() => {
        const result = await axios(`https://amsfs.vercel.app/api/mjesec/${dan.mjesec}`);
        setMjesec(result.data);
    }, [dan]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(updateUrlParams({ 
            id: 7, 
            spol: (tretman.kategorija === "kz" || tretman.kategorija === "sz" || tretman.kategorija === "dz" ? 'zensko': 'musko'), 
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
                    {
                        tretman.trajanje >= 60?
                        tretman.trajanje % 60 === 0 ?
                            <p className="potvrdaItem"><b>Trajanje tretmana:</b> {Math.floor(tretman.trajanje/60)}h</p>:
                            <p className="potvrdaItem"><b>Trajanje tretmana:</b> {Math.floor(tretman.trajanje/60)}h {tretman.trajanje%60}min</p>:
                        <p className="potvrdaItem"><b>Trajanje tretmana:</b> {tretman.trajanje}min</p>
                    }

                    <p className="potvrdaItem"><b>Cijena tretmana:</b> {tretman.cijena}KM</p>
                    <p className="potvrdaItem"><b>Ime i prezime:</b> {params.ime}</p>
                    <p className="potvrdaItem"><b>Telefon:</b> {params.telefon}</p>
                    <p className="potvrdaItem"><b>Kategorija:</b> {getTretmanKategorijaName(tretman.kategorija)}</p>
                    {napomena !== '' && <p className="potvrdaItem"><b>Napomena:</b> {napomena}</p> }         
                    <div onClick={() => potvrda()} className="userpotvrdabtn">POTVRDI</div>
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
