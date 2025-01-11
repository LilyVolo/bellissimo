import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/Skeleton'
import Pagination from '../components/pagination/index'
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'


interface Pizza {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  category: number;
  rating: number;
  sizes: [],
  types: []
}

interface RootState {
  filter: {
    categoryId: number;
    sortType: {
      value: string;
      i: number;
    };
    currentPage: number;
    searchValue: string;
  };
}

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = React.useState(1);

  const { categoryId, sortType, searchValue } = useSelector(
    (state: RootState) => state.filter
  )
  
  const sort = sortType.value

  const [pizzas, setPizzas] = React.useState<Pizza[]>([]) // Типизируем pizzas как массив Pizza
  const [isLoading, setIsLoading] = React.useState<boolean>(true) // Типизируем isLoading как boolean

  let url = `https://671ba6912c842d92c380c897.mockapi.io/bellissimo?page=${currentPage}&${
    categoryId > 0 ? `category=${categoryId}` : ''
  }&sortBy=${sort}&order=desc`


  const onChangePage = (selectedPage: number) => {
    setCurrentPage(selectedPage); // Обновляем текущую страницу
  };
  const onClickCategory = React.useCallback(
    (id: number) => {
      dispatch(setCategoryId(id))
    },
    [dispatch]
  )

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(url)
        setPizzas(response.data)
      } catch (error) {
        console.error('Error fetching pizzas:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    window.scrollTo(0, 0)
  }, [categoryId, sortType, currentPage, url])

  const indexOfLastPizza = (currentPage) * 8
  const indexOfFirstPizza = indexOfLastPizza - 8

 
  const allPizzas = pizzas
    .filter((obj: Pizza) => {
      if (!searchValue) return true
      return obj.title.toLowerCase().includes(searchValue.toLowerCase())
    })
    .slice(indexOfFirstPizza, indexOfLastPizza)
    .map((obj: Pizza) => (
      <PizzaBlock key={obj.id} {...obj} />
    ))
    
  const skeletonArr = [...new Array(6)].map((_, i) => <Skeleton key={i} />)


  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All our pizzas</h2>
      <div className="content__items">{isLoading ? skeletonArr : allPizzas}</div>

      <Pagination categoryId={categoryId} currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  )
}

export default Home
