import { createSlice,createEntityAdapter } from "@reduxjs/toolkit";
import type { Todo } from "../types/Ttodo";

const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

const todosSlice = createSlice({
   name:"todos",
   initialState,
   reducers:{
      todoAdded(state,action){
         todosAdapter.addOne(state,action.payload);
      },
      todoRemoved(state,action){
         todosAdapter.removeOne(state,action.payload.id);
      },
      toggleTodo(state,action){
         const {id} = action.payload;
         const existingTodo = state.entities[id];
         if(existingTodo){
            existingTodo.completed = !existingTodo.completed;
         }
      }
   }
})

export const {todoAdded,todoRemoved,toggleTodo} = todosSlice.actions;
export default todosSlice.reducer;