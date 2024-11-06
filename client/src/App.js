import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FetchBikes from './Components/FetchBikes';
import TrackBike from './Components/TrackBike';
import Login from './Components/Login';
import RegisterBike from './Components/Registerbike';

function App() {
  return (
    <Router>
      <Routes>
        {/* Set Registerbike as the first route */}
        <Route exact path='/' element={<Login />} />
        <Route exact path='/registerbike' element={<RegisterBike />} />
        
        <Route exact path='/fetchallbikes' element={<FetchBikes />} />
        <Route exact path='/fetchonebike' element={<TrackBike />} />
      </Routes>
    </Router>
  );
}

export default App;
