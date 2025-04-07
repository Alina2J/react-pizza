import React from 'react';

import './scss/app.scss';

import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';

import {
  Routes,
  Route,
} from "react-router";


function App() {


  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  </div>
  );

  // Преобозование jsx
  // return React.createElement('div', {className: App}, React.createElement('h1', null, 'Hello world!'));
}

export default App;
