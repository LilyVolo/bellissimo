import React from 'react'

function Categories({value, onClickCategory}) {
   
    const categoriess = ['All', 'Meat', 'Vegeterian', 'Grilled', 'Spicy', 'Calzones']
  

    return (
      <div className="categories">
      <ul>
        { categoriess.map((name, index) => (
            <li key={index} onClick={()=> onClickCategory(index)} 
            className={value == index ? 'active' : ''}>
                {name}
            </li>
        ))} 

      </ul>
    </div>
    )
    }

    export default Categories;