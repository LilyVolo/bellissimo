import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utiles/getCartFromLS';
import { calcTotalPrice } from '../../utiles/calcTotalPrice';

// Получаем начальные данные
const { items, totalPrice } = getCartFromLS();

// Типы для объектов в корзине
interface CartItem {
  id: string; 
  price?: number;
  count?: number;
}

interface CartState {
  totalPrice: number;
  items: CartItem[];
}

const initialState: CartState = {
  totalPrice: totalPrice,
  items: items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem: any = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },

    minusItem(state, action: PayloadAction<CartItem>) {
      const findItem :any = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        if (findItem.count > 1) {
          findItem.count--;
          state.totalPrice = state.totalPrice - action.payload.price;
        } else {
          state.items = state.items.filter((obj) => obj.id !== action.payload.id);
          state.totalPrice = state.totalPrice - action.payload.price;
        }
      }
    },

    removeItem(state, action: PayloadAction<{ id: string }>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        state.totalPrice = state.totalPrice - findItem.price * findItem.count;
        state.items = state.items.filter((obj) => obj.id !== action.payload.id);
      }
    },

    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});


export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;


export default cartSlice.reducer;
