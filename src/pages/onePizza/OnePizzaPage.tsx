import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/slices/cartSlice';
import { CartItem } from '../../components/CartItem';
import styles from './onePizza.module.scss';

const OnePizzaPage: React.FC = () => {
  const [pizza, setPizza] = React.useState<CartItem | null>(null);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const cartItem = useSelector((state: any) =>
    state.cart.items.find((obj: CartItem) => obj.id === id)
  );

  const [activeCrust, setActiveCrust] = React.useState(0);
  const [activeSize, setActiveSize] = React.useState(0);

  const addedCount = cartItem ? cartItem.count : 0;

  const crust = ['thin crust', 'thick crust'];

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://671ba6912c842d92c380c897.mockapi.io/bellissimo/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert('There is a problem with this pizza');
      }
    }
    fetchPizza();
  }, [id]);

  const onClickAdd = () => {
    if (!pizza) return;

    const item: CartItem = {
      id: pizza.id,
      title: pizza.title,
      price: pizza.price,
      imageUrl: pizza.imageUrl,
      size: pizza.sizes[activeSize],
      type: crust[activeCrust],
      count: 1,
    };
    dispatch(addItem(item));
  };

  if (!pizza) {
    return <div>Loading...</div>;
  }

  const { title, price, imageUrl, sizes, types } = pizza;

  return (
    <div className={styles.content__items}>
     
    <div className={styles.pizzaBlock}>
      <img className={styles.content__image} src={imageUrl} alt="Pizza" />
      <h4 className={styles.contentTitle}>{title}</h4>

      <div className="pizza-block__selector">
        <ul>
          {types.map((type: number, index: number) => (
            <li
              key={index}
              onClick={() => setActiveCrust(type)}
              className={activeCrust === type ? 'active' : ''}
            >
              {crust[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size: number, index: number) => (
            <li
              key={index}
              onClick={() => setActiveSize(index)}
              className={activeSize === index ? 'active' : ''}
            >
              {size} cm
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.contentBottom}>
        <div className="pizza-block__price">at {price} euros</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
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
          <span>Add</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
    <div className={styles.pizzaBlockText}>
      <h1 >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consectetur explicabo dolore, sapiente aliquid nostrum sequi? Reiciendis voluptas magni maiores exercitationem voluptatibus obcaecati facere atque nemo animi doloremque! Repudiandae, impedit porro.
      </h1>
    </div>
    </div> 
  );
};

export default OnePizzaPage;
