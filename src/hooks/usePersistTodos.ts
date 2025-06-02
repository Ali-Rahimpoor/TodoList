import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { todosAdapter } from '../features/todosSlice';
import type { AppDispatch, RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../features/todosSlice';

const STORAGE_KEY = 'todos';

export const usePersistTodos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => 
    todosAdapter.getSelectors().selectAll(state.todos)
  );

  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            dispatch(loadTodos(parsed));
          }
        }
      } catch (error) {
        console.error('Failed to load todos:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    };

    loadFromStorage();
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
      } catch (error) {
        console.error('Failed to save todos:', error);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [todos]);

  return todos;
};



// @V2
// import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
// import type { RootState } from '../app/store';

// const STORAGE_KEY = 'todosV2';

// export const usePersistTodos = () => {
//   const todos = useSelector((state: RootState) => state.todos.entities);

//   useEffect(() => {
//     const saveTodos = () => {
//       try {
//         const todosArray = Object.values(todos);
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(todosArray));
//         console.log('✅ Saved to localStorage');
//       } catch (error) {
//         console.error('❌ LocalStorage save error:', error);
//       }
//     };
    
//     saveTodos();
//     window.addEventListener('beforeunload', saveTodos);
    
//     return () => {
//       window.removeEventListener('beforeunload', saveTodos);
//     };
//   }, [todos]);

//   return Object.values(todos);
// };