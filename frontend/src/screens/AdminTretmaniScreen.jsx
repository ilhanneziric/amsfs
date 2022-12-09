import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Modal } from 'react-bootstrap';

const {getTretmanKategorijaName} = require('../funkcije');

const AdminTretmaniScreen = () => {
  const [tretmani, setTretmani] = useState([]);
  const {register, handleSubmit, formState: { errors }} = useForm();
  const odabraniTretman = useRef('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(async () => {
    const result = await axios(`https://amsfs.vercel.app/api/tretman`);
    setTretmani(result.data);
  }, []);

  const onSubmit = async(data) => {
    data.cijena = Number(data.cijena);
    data.trajanje = Number(data.trajanje);
    const response = await axios.post('https://amsfs.vercel.app/api/tretman/', data);
    const result = await axios(`https://amsfs.vercel.app/api/tretman`);
    setTretmani(result.data);
    
  };

  const otvoriModal = (id) => {
    setShow(true);
    odabraniTretman.current = id;
  }

  const izbrisi = async() => {
    setShow(false);
    const result = await axios.delete(`https://amsfs.vercel.app/api/tretman/${odabraniTretman.current}`);
    const resultt = await axios(`https://amsfs.vercel.app/api/tretman`);
    setTretmani(resultt.data);
  }

  return (
    <div className="adminHomePage">
            <div className="AdminDugmiciFullWidth">
            <Link to='/admin'><div className="adminDugme statistikaNatragBtn"><FaArrowLeft className="faAdminStrelica"/>NAZAD</div></Link>
            </div>
            <div className="lijevoKalendar">
            <form className="userUnosForma" onSubmit={handleSubmit(onSubmit)}>

              <div className="jedanAdminInput">
                  <label htmlFor="naslov" className="userAdminlbl">NAZIV TRETMANA:</label>
                  <input placeholder="" {...register("naslov", { validate: (value) => value !== ""})} className="userAdmininput"/>
                      {errors.naslov && <p className="usererr">Morate unijeti naziv tretmana!</p>}
              </div>

              <div className="jedanAdminInput">
                  <label htmlFor="opis" className="userAdminlbl">OPIS:</label>
                  <textarea {...register("opis", { validate: (value) => value === value})} className="userAdmininput"/>
                      {errors.opis && <p className="usererr">Morate unijeti opis tretmana!</p>}
              </div>

              <div className="jedanAdminInput">
                  <label htmlFor="cijena" className="userAdminlbl">CIJENA:</label>
                  <input type='number' {...register("cijena", { validate: (value) => value > 0})} className="userAdmininput"/>
                      {errors.cijena && <p className="usererr">Morate unijeti cijenu tretmana!</p>}
              </div>

              <div className="jedanAdminInput">
                  <label htmlFor="trajanje" className="userAdminlbl">TRAJANJE (min):</label>
                  <input type='number' {...register("trajanje", { validate: (value) => value > 0})} className="userAdmininput"/>
                      {errors.trajanje && <p className="usererr">Morate unijeti trajanje tretmana!</p>}
              </div>

              <div className="jedanAdminInput">
                  <label htmlFor="kategorija" className="userAdminlbl">KATEGORIJA:</label>
                  <select {...register("kategorija", { validate: (value) => value  === value})} className="userAdmininput">
                    <option value="kz">Kratka ženska</option>
                    <option value="sz">Srednja ženska</option>
                    <option value="dz">Duga ženska</option>
                    <option value="km">Kratka muška</option>
                    <option value="sm">Srednja muška</option>
                    <option value="dm">Duga muška</option>
                  </select>                  
              </div>

              <input type="submit" className="userbtn" value={"DALJE"}/>

            </form>
            </div>
            <div className="desnoTermini">
            <label className="userAdminlbl">SVI TRETMANI:</label>
            {
                tretmani.map(tretman =>
                <div className="adminTretmanBody" key={tretman._id} onClick={() => otvoriModal(tretman._id)}>
                  <div className="adminTretmanLijevo">
                    <div className="adminTretmanNaslov">{tretman.naslov}</div>
                    {
                      tretman.opis===""?
                      <div className="adminTretmanBezOpis">.</div>:
                      <div className="adminTretmanOpis">{tretman.opis}</div>
                    }
                  </div>
                  <div className="adminTretmanDesno">
                    <div className="adminTretmanKategorija">{getTretmanKategorijaName(tretman.kategorija)}</div>
                    <div className="adminTretmanCijena">{tretman.cijena}KM</div>
                    <div className="adminTretmanTrajanje">{tretman.trajanje}min</div>
                  </div>
                </div>
                  )
            }
            </div>
            <Modal show={show} onHide={handleClose} backdrop="static" centered={true}>
              <Modal.Header>
                  {/* <Modal.Title>Ovo je naslov</Modal.Title> */}
              </Modal.Header>
              <div className="modalBody">
                  <p className="potvrdaItemModal">Da li ste sigurni da želite obrisati dati tretman.</p> 
              </div>
              <Modal.Footer className="modalFooter">
                  <div className="usermodalbtn" onClick={() => setShow(false)}>ODUSTANI</div>
                  <div className="usermodalredbtn" onClick={() => izbrisi()}>DA</div>
              </Modal.Footer>
            </Modal>
                
        </div>
  )
}

export default AdminTretmaniScreen