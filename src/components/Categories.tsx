import React from 'react'

type CategoriesProps  = {
  value : number;
  onClickCategory: any;
}

const Categories = React.memo<CategoriesProps>(({value, onClickCategory}) => {
   
 const categoriess = React.useMemo(() => ['All', 'Meat', 'Vegetarian', 'Grilled', 'Spicy', 'Calzones'], []);

  console.log('check rerender')
    return (
      <div className="categories">
      <ul>
        { categoriess.map((name, index) => (
            <li key={index} onClick={()=> onClickCategory(index)} 
            className={value === index ? 'active' : ''}>
                {name}
            </li>
        ))} 

      </ul>
    </div>
    )
    }
  )
    export default Categories;