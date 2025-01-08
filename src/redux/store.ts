import { configureStore } from "@reduxjs/toolkit";
import filter from './slices/filterSlice';
import cart from './slices/cartSlice';


export type RootState = ReturnType<typeof store.getState>;


export type AppDispatch = typeof store.dispatch;


const store = configureStore({
  reducer: {
    filter,
    cart,
  },
});

export default store;
