import '../components/styles/statistika.scss';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import axios from "axios";
const {getTretmanKategorijaName} = require('../funkcije');

const AdminStatistika = () => {
  const adminDani = useSelector(state => state.adminDani);
  const[tretmans, setTretmans] = useState([]);
  const [zarada, setZarada] = useState(0);

  const getNajMusterija = () => {
    let musterija = [];
    adminDani.filter(dan => dan.termini.filter(termin => musterija.push(termin.ime)));
    const musterije = [...new Set(musterija)].map(mus => ({ime: mus, freq: 0}));
    musterije.filter(um => musterija.map(m => m == um.ime? um.freq++ : um.freq));
    musterije.sort((a, b) => {
        return b.freq - a.freq;
    });
    return musterije.slice(0,5);
  }


  useEffect(async () => {

    let tretman = [];
    adminDani.filter(dan => dan.termini.filter(termin => tretman.push(termin.tretman)));
    let tretmaniFreq = [...new Set(tretman)].map(mus => ({tretman: mus, freq: 0}));
    tretmaniFreq.filter(um => tretman.map(m => m == um.tretman? um.freq++ : um.freq));
    tretmaniFreq.sort((a, b) => {
        return b.freq - a.freq;
    });
    setTretmans([]);
    setZarada(0);
    for (let i = 0; i < tretmaniFreq.length; i++) {
        const result = await axios(`http://localhost:5000/api/tretman/${tretmaniFreq[i].tretman}`);
        result.data.freq = tretmaniFreq[i].freq;
        setTretmans(proslo => [...proslo, result.data]);
        setZarada(stanje => stanje += result.data.cijena * result.data.freq);
    }
  }, [adminDani]);

  
  return (
    <div>
        <h1 className='statistikaNaslov'>STATISTIKA</h1>
        <div className='radnidani'>RADNI DANI: <p className='brojRadnihDana'>{adminDani.filter(dan => dan.disabled == 'false').length}</p></div> 
        <div className='radnidani'>NERADNI DANI: <p className='brojRadnihDana'>{adminDani.filter(dan => dan.disabled == 'true').length}</p></div> 
        <div className='statistikaTabelaLabel'>TOP 5 MUŠTERIJA: </div>
        <table>
            <tbody>
                <tr>
                    <th>IME I PREZIME</th>
                    <th>BROJ REZERVACIJA</th>
                </tr>
                {
                    getNajMusterija().map((mus, index) => <tr key={index}>
                        <td>{mus.ime}</td>
                        <td>{mus.freq}</td>
                    </tr>)
                }
            </tbody>
        </table>
        <div className='statistikaTabelaLabel'>TOP 5 TRETMANA:</div> 
        <table>
            <tbody>
                <tr>
                    <th>NAZIV TRETMANA</th>
                    <th>KATEGORIJA</th>
                    <th>CIJENA</th>
                    <th>BROJ REZERVACIJA</th>
                    <th>ZARADA</th>
                </tr>
                {
                    tretmans.slice(0,5).map((tret, index) => <tr key={index}>
                        <td>{tret.naslov}</td>
                        <td>{getTretmanKategorijaName(tret.kategorija)}</td>
                        <td>{tret.cijena}KM</td>
                        <td>{tret.freq}</td>
                        <td>{tret.cijena * tret.freq}KM</td>
                    </tr>)
                }
            </tbody>
        </table>
        <div className='radnidani'>SVEUKUPNA ZARADA: <p className='brojRadnihDana'>{zarada}KM</p></div> 
    </div>
  )
}

export default AdminStatistika