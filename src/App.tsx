import React from 'react'
import './scss/app.scss'
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart'
import {Routes, Route } from "react-router-dom";
import OnePizzaPage from './pages/onePizza/OnePizzaPage'


function App() {

  return (
    <>
     <div className="wrapper">

      <Header  />
      <div className="content">
        
          <Routes>
            <Route path='/'element={<Home />}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/pizza/:id' element={<OnePizzaPage/>}/>
          </Routes>
        
      </div>
    </div>
    </>
  )
}

export default App
