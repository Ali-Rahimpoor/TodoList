import { createSlice, createEntityAdapter, type PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "../types/Ttodo";
import type { RootState } from "../app/store";
import { nanoid } from "@reduxjs/toolkit";

export const todosAdapter = createEntityAdapter<Todo>();

const initialState = todosAdapter.getInitialState();

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    todoAdded: {
      reducer: todosAdapter.addOne,
      prepare: (title: string) => ({
        payload: {
          id: nanoid(),
          title,
          completed: false,
          date: new Date()
        },
      }),
    },
    todoRemoved: todosAdapter.removeOne,
    todoToggled(state, action: PayloadAction<string>) {
      const todo = state.entities[action.payload];
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    todosLoaded(state, action: PayloadAction<Todo[]>) {
      return todosAdapter.setAll(state, action.payload);
    },
  },
});


export const { todoAdded, todoRemoved, todoToggled, todosLoaded } = todosSlice.actions;


export const {
  selectAll,
  selectById,
  selectIds,
} = todosAdapter.getSelectors((state: RootState) => state.todos);


export const loadTodos = (todos: Todo[]) => todosLoaded(todos);

export default todosSlice.reducer;