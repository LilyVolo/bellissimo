import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart', // Название среза
    initialState: { 
    totalPrice: 0,
    items: []
    }, // Начальное состояние
  reducers: {
   addItem(state, action) {
        // state.items.push(action.payload)
    const findItem = state.items.find((obj) => obj.id === action.payload.id)
    if (findItem){
      findItem.count++
    } else {
      state.items.push({...action.payload, 
        count: 1
      })}

    state.totalPrice = state.items.reduce((sum, obj) => {
          return obj.price*obj.count + sum
          }, 0)

      console.log(state.items, state.totalPrice)
        },
    
    minusItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload)
      if (findItem) {
        findItem.count--
      }
    },
    removeItem(state, action) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
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
