import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todosSlice";
import filterReducer from "../features/FilterSlice";
const store = configureStore({
   reducer:{
      todos:todosReducer,
      filter:filterReducer,
   }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;