import './App.css';
import React from 'react';
import LandingPage from './pages/LandingPage';
import InfoPage from './pages/InfoPage';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout';
import Bookings from './pages/Bookings';



function App() {


  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path='/infopage/:id' element={<InfoPage />} />
        <Route path='/bookings' element={<Bookings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
