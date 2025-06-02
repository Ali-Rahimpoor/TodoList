import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectAll} from '../features/todosSlice';
import type { AppDispatch} from '../app/store';
import { useDispatch } from 'react-redux';
import { loadTodos } from '../features/todosSlice';

const STORAGE_KEY = 'todos';

export const usePersistTodos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector(selectAll);

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
