import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector} from 'react-redux';

import { FaArrowRight } from "react-icons/fa";
import MjesecSwitcher from "../components/MjesecSwitcher";
import AdminKalendar from "../components/AdminKalendar";
import AdminTermini from "../components/AdminTermini";
import '../components/styles/adminHome.scss';
import socket from '../Socket.js'
import { Modal } from 'react-bootstrap';
import sound from '../zvukovi/drugizvuk.wav';
import statistikaIcon from '../icons/statistika2.png';
import tretmanIcon from '../icons/tretmani.png';
const {getTretmanKategorijaName} = require('../funkcije');

const AdminScreen = () => {

    function playSound(url) {
        const audio = new Audio(url);
        audio.play();
    }

    const datum = new Date();
    const datumce = {
        broj: datum.getMonth() + 1,
        godina: datum.getFullYear()
    };

    const [odabraniTretman, setOdabraniTretman] = useState({});
    const [odabraniTermin, setOdabraniTermin] = useState({});

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const [mjesec, setMjesec] = useState({});
    const [dani,setDani] = useState([]);
    const [lijevo,setLijevo] = useState({});
    const [desno, setDesno] = useState();
    const [termini, setTermini] = useState(null);
    const [ntermini, setNTermini] = useState([]);
    const [cekiran, setCekiran] = useState(false);

    const adminDan = useSelector(state => state.adminDan);

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/termin/dan/prihvaceni/${adminDan}`);
        setTermini(result.data);
    }, [adminDan]);

    useEffect(() => {
        for (let i = 0; i < dani.length; i++) {
            if(dani[i]._id == adminDan){
                setCekiran((dani[i].disabled == 'true'? true:false));
            }
        }
    }, [adminDan]);

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${datumce.broj}/${datumce.godina}`);
        setMjesec(result.data);
        setujDane(result.data._id);
        setNeprihvacene();
        socket.emit('register_admin', 'admin');
        socket.on('prihvati_zahtjev', () => {
            playSound(sound)
            setNeprihvacene();
        });
    }, []);

    const setujDane = async(id) => {
        const rezultat = await axios(`http://localhost:5000/api/dan/mjesec/${id}`);
        setDani(rezultat.data);
    }

    useEffect(async () => {
        const result = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 12 ? Number(mjesec.broj - 11) : Number(mjesec.broj + 1)}/${mjesec.broj === 12 ? Number(mjesec.godina + 1) : Number(mjesec.godina)}`);
        setDesno(result.data);
        const rezultat = await axios(`http://localhost:5000/api/mjesec/${mjesec.broj === 1 ? Number(mjesec.broj + 11 ) : Number(mjesec.broj - 1)}/${mjesec.broj === 1 ? Number(mjesec.godina - 1) : Number(mjesec.godina)}`);
        setLijevo(rezultat.data);
    }, [mjesec]);

    let prosliMjesec = [];
    for (let i = 0; i < mjesec.pocetniDan; i++) {
        prosliMjesec.push({broj: 31-i, disabled: "true"});
    }
    prosliMjesec = prosliMjesec.reverse();

    let buduciMjesec = [];
    for (let i = 1; i <= (42 - (dani.length + mjesec.pocetniDan)); i++) {
        buduciMjesec.push({broj: i, disabled: "true"});
    }

    const setujLijevo = () => {
        setMjesec(lijevo);
        setujDane(lijevo._id);
    };
    const setujDesno = () => {
        setMjesec(desno);
        setujDane(desno._id);
    };

    const setujCekiranje = () => {
        for (let i = 0; i < dani.length; i++) {
            if(dani[i]._id == adminDan){
                const updateuj = async()=>{
                    let obj = {
                        broj: dani[i].broj,
                        disabled: (dani[i].disabled === 'true'? 'false': 'true'),
                        mjesec: dani[i].mjesec
                    };
                    const result = await axios.patch(`http://localhost:5000/api/dan/${dani[i]._id}`,obj);
                    await setujDane(dani[i].mjesec);
                    setCekiran(!cekiran);
                }
                updateuj();
            }
        }
    }

    const setNeprihvacene = async() => {
        const result = await axios(`http://localhost:5000/api/termin/dan/prihvaceni/${adminDan}`);
        setTermini(result.data);
        const resultt = await axios(`http://localhost:5000/api/termin/neprihvaceni`);
        setNTermini(resultt.data);
    }

    const izbrisiZahtjev = async(id) => {
        const result = await axios.delete(`http://localhost:5000/api/termin/${id}`);
        await setNeprihvacene();
    }
    
    const prihvatiZahtjev = async(termince) => {
        termince.isPrihvacen = 'true';
        const result = await axios.patch(`http://localhost:5000/api/termin/${termince._id}`, termince);
        await setNeprihvacene();
    }

    const otvoriModal = async(terminn) => {
        setOdabraniTermin(terminn);
        const result = await axios(`http://localhost:5000/api/tretman/${terminn.tretman}`);
        setOdabraniTretman(result.data);
        setShow(true);
    }
    
    return( 
    <div className="adminHomePage">
        <div className="AdminDugmiciFullWidth">
            <Link to='/admin/statistika'><div className="adminDugme"><img src={statistikaIcon} className="ikonicaStatistikaTretman"/>STATISTIKA<FaArrowRight className="faAdminStrelica"/></div></Link>
        </div>
        <div className="AdminDugmiciFullWidth">
        <Link to='/admin/tretmani'><div className="adminDugme"><img src={tretmanIcon} className="ikonicaStatistikaTretman"/>TRETMANI<FaArrowRight className="faAdminStrelica"/></div></Link>
        </div>
        <div className="lijevoKalendar">
            <MjesecSwitcher lijevo={lijevo} desno={desno} mjesec={mjesec} setujDesno={setujDesno} setujLijevo={setujLijevo}/>
            <AdminKalendar prosli={prosliMjesec} sadasnji={dani} buduci={buduciMjesec} diskriminator = {1}/>
            <div className="neprihvaceniTermini">
                <div className='statistikaTabelaLabel'>ZAHTJEVI ZA REZERVISANJE:</div> 
                {
                    ntermini !== null && ntermini.length !== undefined &&
                    ntermini.map((d, index)=>(<AdminTermini key={index} termin={d} izbrisiZahtjev={izbrisiZahtjev} otvoriModal={otvoriModal} prihvatiZahtjev={prihvatiZahtjev} diskriminator={2}/>))                
                }
            </div>
        </div>
        <div className="desnoTermini">

            <div className="danSwitcher">
                <h4 className="switcherLabel">RADNI DAN: </h4> 
                <label className="switch">
                    <input type="checkbox" onChange={() => setujCekiranje()} checked={!cekiran}/>
                    <span className="slider round"></span>
                </label>
            </div>
            <div className='statistikaTabelaLabel'>TERMINI:</div> 
            <div className="adminTerminiBlok">
            {
               adminDan !== '' && termini !== null && termini.length !== undefined &&
               termini.map((d, index)=>(<AdminTermini key={index} termin={d} diskriminator={1}  otvoriModal={otvoriModal} izbrisiZahtjev={izbrisiZahtjev} prihvatiZahtjev={prihvatiZahtjev}/>))                
            }
            </div>
            
        </div>
        <Modal show={show} onHide={handleClose} backdrop="static" centered={true}>
              <Modal.Header>
                  {/* <Modal.Title>Ovo je naslov</Modal.Title> */}
              </Modal.Header>
              <div className="modalBody">
                  {
                      odabraniTermin.ime !== undefined && odabraniTretman.naslov !== undefined?
                        <>
                            <p className="potvrdaItemModal"><b>Ime i prezime:</b> {odabraniTermin.ime}</p>
                            <p className="potvrdaItemModal"><b>Telefon:</b> {odabraniTermin.telefon}</p>
                            <p className="potvrdaItemModal"><b>Vrijeme:</b> {odabraniTermin.sat}:{odabraniTermin.minuta === "0" ? "00" : odabraniTermin.minuta}</p>
                            {odabraniTermin.napomena !== '' && <p className="potvrdaItemModal"><b>Napomena:</b> {odabraniTermin.napomena}</p> } 

                            <p className="potvrdaItemModal"><b>Tretman:</b> {odabraniTretman.naslov}</p>
                            {odabraniTretman.opis !== '' && <p className="potvrdaItemModal"><b>Opis tretmana:</b> {odabraniTretman.opis}</p> }
                            {
                                odabraniTretman.trajanje >= 60?
                                odabraniTretman.trajanje % 60 === 0 ?
                                    <p className="potvrdaItemModal"><b>Trajanje tretmana:</b> {Math.floor(odabraniTretman.trajanje/60)}h</p>:
                                    <p className="potvrdaItemModal"><b>Trajanje tretmana:</b> {Math.floor(odabraniTretman.trajanje/60)}h {odabraniTretman.trajanje%60}min</p>:
                                <p className="potvrdaItemModal"><b>Trajanje tretmana:</b> {odabraniTretman.trajanje}min</p>
                            }
                            <p className="potvrdaItemModal"><b>Cijena tretmana:</b> {odabraniTretman.cijena}KM</p>
                            <p className="potvrdaItemModal"><b>Kategorija:</b> {getTretmanKategorijaName(odabraniTretman.kategorija)}</p>
                        </>:''
                  }
              </div>
              <Modal.Footer className="modalFooter">
                  <div className="usermodalbtn" onClick={() => setShow(false)}>OK</div>
              </Modal.Footer>
        </Modal>
    </div>);
};

export default AdminScreen;
