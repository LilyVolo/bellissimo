import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/pagination/index.jsx'
import {setCategoryId, setCurrentPage} from '../redux/slices/filterSlice.js'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import { searchContext } from '../App'


const Home = () => {
  const dispatch = useDispatch()
  const {categoryId, sortType, currentPage} = useSelector((state) => state.filter)
  const sort = sortType.value

  const {searchValue} = React.useContext(searchContext)
  const [pizzas, setPizzas] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(true)


const onChangePage = (number) => {
  dispatch(setCurrentPage(number))
}

const onClickCategory = (id) => {
dispatch(setCategoryId(id))
}

React.useEffect( () => {
  setIsLoading(true)
  axios.
  get(
    `https://671ba6912c842d92c380c897.mockapi.io/bellissimo?page=${currentPage}&limit=4&${
    categoryId >0 ? `category=${categoryId}` : ''}&sortBy=${sort}&order=desc
  `)
  .then((res) => {
    setPizzas(res.data)
    setIsLoading(false) 
    console.log(currentPage)
  })
  window.scrollTo(0, 0)
},
    [categoryId, sortType, currentPage] )



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
