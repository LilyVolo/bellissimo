import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    const items = data ? JSON.parse(data) : []
    const totalPrice =calcTotalPrice(items)
        console.log(items, totalPrice, 'check!')
    return {
        items,
        totalPrice
    }

}