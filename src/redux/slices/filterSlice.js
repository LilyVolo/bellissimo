import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter', // Название среза
  initialState: { 
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sortType: {
        value : 'title',
            i : 2
    }
   }, // Начальное состояние
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
        state.categoryId = action.payload
         },
    setSortType(state, action) {
        state.sortType = action.payload;
          },
    setCurrentPage(state, action) {
        state.currentPage = action.payload
          }
        
  },
});

// Экспортируем действия
export const { setCategoryId, setSortType, setCurrentPage, setSearchValue} = filterSlice.actions;

// Экспортируем редюсер
export default filterSlice.reducer;
