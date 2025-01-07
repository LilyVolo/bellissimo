import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/pagination/index.jsx'
import {setCategoryId, setCurrentPage} from '../redux/slices/filterSlice.js'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'


const Home = () => {
  const dispatch = useDispatch()
  const {categoryId, sortType, currentPage, searchValue} = useSelector((state) => state.filter)
  const sort = sortType.value

  const [pizzas, setPizzas] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)

  let url = `https://671ba6912c842d92c380c897.mockapi.io/bellissimo?page=${currentPage}&limit=4&${
    categoryId > 0 ? `category=${categoryId}` : ''
  }&sortBy=${sort}&order=desc`;

const onChangePage = (number) => {
  dispatch(setCurrentPage(number))
}

const onClickCategory = React.useCallback(
  (id) => {
  dispatch(setCategoryId(id))
  }, [dispatch]
)

React.useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(url);
      setPizzas(response.data);
    } catch (error) {
      console.error("Error fetching pizzas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
  window.scrollTo(0, 0);
}, [categoryId, sortType, currentPage, url]);



    const allPizzas = pizzas
    .filter((obj) => {
    // Если searchValue не задано, возвращаем true (все пиццы проходят фильтр)
      if (!searchValue) return true;
  
   // Если searchValue задано, фильтруем по совпадению
       return obj.title.toLowerCase().includes(searchValue.toLowerCase());
     })
    .map((obj) => (
      <PizzaBlock key={obj.id} {...obj } />
    ));


    const skeletonArr = [...new Array(6)].map((_, i) => 
      <Skeleton key={i} />)

  return (
    <div className='container'>
          <div className="content__top">
           <Categories value={categoryId} onClickCategory={ (i)=>onClickCategory(i) }/> 
           <Sort sortValue={sortType} />
          
          </div>
          <h2 className="content__title">All our pizzas</h2>
          <div className="content__items">
      {isLoading 
      ? skeletonArr
      : allPizzas}
  
     </div>

  <Pagination value={currentPage} onChangePage={onChangePage}/>
 </div>
  )
}

export default Home
