// Для старого метода создания html разметки до jsx
// import React from "react";

import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import pizzas from './assets/pizzas.json'
function Pizza() {

}

function App() {
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {
              pizzas.map(pizza => (
                <PizzaBlock {...pizza} />
              ))
            }
        </div>
      </div>
    </div>
  </div>
  );

  // Преобозование jsx
  // return React.createElement('div', {className: App}, React.createElement('h1', null, 'Hello world!'));
}

export default App;
