import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {addItem} from '../redux/slices/cartSlice'
import { Link } from 'react-router-dom'
import { CartItemProps } from '../pages/Cart'

export type PizzaBlockProps = {
    id: string, 
    title: string, 
    price: number, 
    imageUrl: string, 
    sizes: [],
    types: []
}


const PizzaBlock: React.FC<PizzaBlockProps> =  
({id, title, price, imageUrl, sizes, types}) =>

  {

  const dispatch = useDispatch()
  const cartItem = useSelector((state: any)=> state.cart.items.find((obj: CartItemProps )=> obj.id === id))
  const totalCountersById = useSelector((state: { cart: { totalCountersById: { [id: string]: number } } }) => state.cart.totalCountersById);

  const [activeCrust, setActiveCrust] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)
   
  const totalCountForId = totalCountersById[id] || 0; 

  const addedCount = cartItem ? cartItem.count : 0
  
  const crust = ['thin crust', 'thick crust']

  const onClickAdd = () => {
      const item: CartItemProps  = {
        id, 
        title,
        price,
        imageUrl,
        size: sizes[activeSize],
        type: crust[activeCrust],
      }
      dispatch(addItem(item))
    }

    return (
        <div className="pizza-block">
          <Link   to={`pizza/${id}`} >
      <img
      className="pizza-block__image"
      src={imageUrl}
      alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      </Link>
  <div className="pizza-block__selector">
    <ul>
      
    {types &&  types.map((type: number, index: number) => (
        <li key={index}
        onClick={()=> setActiveCrust(type)}
        className={activeCrust == type ? 'active' : ''}> 
        {crust[type]} </li>
      ))}
    </ul>
    <ul>
    {sizes && sizes.map((size: number, index: number) => (
        <li key={index}
        onClick={()=> setActiveSize(index)}
        className={activeSize == index ? 'active' : ''}>
            {size} cm</li>
      )

      )}
    </ul>
  </div>
 
  <div className="pizza-block__bottom">
    <div className="pizza-block__price">at {price} euros</div>
    <button onClick={onClickAdd} className="button button--outline button--add">
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
          fill="white"
        />
      </svg>
      <span >Add</span>
      {cartItem && <i>{totalCountForId}</i>} 
    </button>
  </div>
  </div>
    )
} 

export default PizzaBlock;