import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

export default function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
  });
  const [sortDirection, setSortDirection] = React.useState('desc');
  const [emptyPizza, setEmptyPizza] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const skeletons = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  // Статичный поиск через js
  // const pizzas = items
  //   .filter((obj) => {
  //     return obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false;
  //   })
  //   .map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://67ed0be84387d9117bbc0253.mockapi.io/items?sortBy=${
        sortType.sortProperty
      }&order=${sortDirection}&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&title=${searchValue}&page=${currentPage}&limit=4`,
    )
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json === 'Not found') {
          setEmptyPizza(false);
        } else {
          setEmptyPizza(true);
          setItems(json);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, sortDirection, searchValue, currentPage]);

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
      {emptyPizza ? (
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      ) : (
        <p>По вашему запросу ничего не найдено :(</p>
      )}
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
