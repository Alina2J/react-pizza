import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [sortDirection, setSortDirection] = React.useState('desc');

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67ed0be84387d9117bbc0253.mockapi.io/items?sortBy=${
        sortType.sortProperty
      }&order=${sortDirection}&${categoryId > 0 ? `category=${categoryId}` : ''}`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortDirection]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          value={sortType}
          onClickItem={(id) => setSortType(id)}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}
