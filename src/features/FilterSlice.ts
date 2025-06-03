import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import { selectAll } from "./todosSlice";
const initialState = {
   filter:"all"
}

const filterSlice = createSlice({
   name:"filter",
   initialState,
   reducers:({
      setFilter:(state,action:PayloadAction<string>)=>{
         state.filter = action.payload
      }
   })
})

export const {setFilter} = filterSlice.actions;

export const selectFilter = (state:RootState) => state.filter.filter;

export const selectFilteredTodos = (state:RootState)=>{
   const todos = selectAll(state);
   const filter = selectFilter(state);

   switch(filter){
      case 'active':
         return todos.filter(todo=> !todo.completed);
         break;
      case 'complete':
         return todos.filter(todo=> todo.completed);
         break;
      default:
         return todos;
   }
}

export default filterSlice.reducer;