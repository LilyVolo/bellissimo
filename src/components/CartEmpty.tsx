
import React from 'react'
import {Link} from 'react-router-dom'

const CartEmpty = () => {

  return (
          <div className="content">
            <div className="container container--cart">
              <div className="cart cart--empty">
                <h2> The cart is empty  😕</h2>
                <p>
                You haven't ordered a pizza yet.
                To order a pizza, please go to the main page.
                </p>
                <img src="../public/img/empty-cart.png" alt="Empty cart" />
                <Link to='/' className="button button--black">
                  <span>Go back</span>
                  </Link>
              </div>
            </div>
          </div>
      
  )
}

export default CartEmpty