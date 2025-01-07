import { createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utiles/getCartFromLS';
import {calcTotalPrice} from '../../utiles/calcTotalPrice'

const {items, totalPrice} = getCartFromLS()


const cartSlice = createSlice({ 
    name: 'cart', // Название среза
    initialState: { 
    totalPrice: totalPrice,
    items: items,
    }, // Начальное состояние
  reducers: {
   addItem(state, action) {
    const findItem = state.items.find((obj) => obj.id === action.payload.id)
    if (findItem) {
      findItem.count++
    } else {
      state.items.push({...action.payload, 
        count: 1
      })}

    state.totalPrice = calcTotalPrice(state.items)

        },
    
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      if (findItem) {
        if(findItem.count > 1) {
          findItem.count--
          state.totalPrice = state.totalPrice- action.payload.price
        }
      else {
           state.items = state.items.filter((obj) => obj.id !== action.payload.id)
           state.totalPrice = state.totalPrice- action.payload.price
      }
        
      }
    },
    removeItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)
      state.totalPrice = state.totalPrice- findItem.price*findItem.count
      state.items = state.items.filter((obj) => obj.id !== action.payload.id)
    },
    clearItems(state) {
        state.items = []
        state.totalPrice = 0
    }

  },
});

// Экспортируем действия
export const {addItem, removeItem, clearItems, minusItem} = cartSlice.actions;

// Экспортируем редюсер
export default cartSlice.reducer;
