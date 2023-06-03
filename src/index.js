import React from 'react';
import ReactDOM from 'react-dom/client'; 
import Home from './pages/home';
import './global.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Details from './pages/Details';
import UpComing from './pages/upComing';
import TopRated from './pages/topRated/index';
import Series from './pages/series';
import DetailsSeries from './pages/DetailsSeries';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/details/:id" element={ <Details /> } />
      <Route path="/detailsSeries/:id" element={ <DetailsSeries /> } />
      <Route path='/Upcoming' element={ <UpComing /> } />
      <Route path='/TopRated' element={ <TopRated /> } />
      <Route path='/Series' element={ <Series /> } />
    </Routes>
  </BrowserRouter>
);