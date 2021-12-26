import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'

//screens
import SpolScreen from './screens/SpolScreen';
import KategorijaScreen from './screens/KategorijaScreen';
import TretmanScreen from './screens/TretmanScreen';
import KalendarScreen from './screens/KalendarScreen';
import TerminScreen from './screens/TerminScreen';
import PotvrdaScreen from './screens/PotvrdaScreen';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        hello amsfs
      </div>
      <main>
        <Routes>
          <Route path='/' element = {<SpolScreen/>}/>
          <Route path='/kategorija' element = {<KategorijaScreen/>}/>
          <Route path='/tretman' element = {<TretmanScreen/>}/>
          <Route path='/kalendar' element = {<KalendarScreen/>}/>
          <Route path='/termin' element = {<TerminScreen/>}/>
          <Route path='/potvrda' element = {<PotvrdaScreen/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
