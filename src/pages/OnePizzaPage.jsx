import React from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'

function OnePizzaPage() {
    const [pizza, setPizza] = React.useState([])
    let {id} = useParams()
    console.log(pizza)

    React.useEffect(()=>{ 
        async function fetchPizza() {
            try{
                const { data } = await axios.get(`https://671ba6912c842d92c380c897.mockapi.io/bellissimo/${id}`)
                setPizza(data)
                console.log(data)
            } catch(error) {
                alert('There is a problem with this pizza')
            }
        }
        fetchPizza()
    }, [])

    if (!pizza) {
        return 'Loading...'
    }
  return (
   
    <div className="container">
       <h1>OnePizzaPage </h1> 
        <h2>{pizza.title}</h2>
        </div>
  )
}
export default OnePizzaPage