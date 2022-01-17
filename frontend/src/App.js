import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//screens
import SpolScreen from './screens/SpolScreen';
import KategorijaScreen from './screens/KategorijaScreen';
import TretmanScreen from './screens/TretmanScreen';
import KalendarScreen from './screens/KalendarScreen';
import TerminScreen from './screens/TerminScreen';
import PotvrdaScreen from './screens/PotvrdaScreen';
import './components/styles/sve.scss'

//components
import Header from './components/Header';


function App() {
  return (
    <BrowserRouter>
      <Header/>
      <main>
          <Routes>
            <Route path='/' element = {<SpolScreen/>}/>
            <Route path='/kategorija/:id' element = {<KategorijaScreen/>}/>
            <Route path='/tretman/:id' element = {<TretmanScreen/>}/>
            <Route path='/kalendar/:id' element = {<KalendarScreen/>}/>
            <Route path='/termin/:danid/:tretmanid' element = {<TerminScreen/>}/>
            <Route path='/potvrda' element = {<PotvrdaScreen/>}/>
          </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
