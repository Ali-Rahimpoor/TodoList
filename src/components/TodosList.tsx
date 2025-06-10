import { useDispatch, useSelector } from "react-redux";
import { todoToggled, todoRemoved } from "../features/todosSlice";
import { IoTrash } from "react-icons/io5";
import { usePersistTodos } from "../hooks/usePersistTodos";
import { useMemo, useState } from "react";
import { selectFilteredTodos } from "../features/FilterSlice";

const TodosList = () => {
  usePersistTodos();
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos); 
  
  const [sortNewestFirst, setSortNewestFirst] = useState(false);
 

  const sortedTodos = useMemo(() => {
    return [...filteredTodos].sort((a, b) => {
      return sortNewestFirst
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }, [filteredTodos, sortNewestFirst]);

  const handleDelete = (id: string) => {
    dispatch(todoRemoved(id));
  };

  const handleToggle = (id: string) => {
    dispatch(todoToggled(id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
        <h2 className="font-DanaMedium text-lg text-gray-700">لیست کارها</h2>
        <label className="inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            className="sr-only peer"
            checked={sortNewestFirst}
            onChange={() => setSortNewestFirst(!sortNewestFirst)}
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
          <span className="mr-2 text-sm font-Dana text-gray-600">جدیدترین ها</span>
        </label>
      </div>

      <ul className="divide-y divide-gray-200 h-140 overflow-y-auto">
        {sortedTodos.map(todo => (
          <li 
            key={todo.id}
            className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-between ${
              todo.completed ? "bg-amber-50" : "bg-white"
            }`}
            onClick={() => handleToggle(todo.id)}
          >
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                todo.completed 
                  ? "bg-amber-500 border-amber-500" 
                  : "border-gray-300"
              }`}></div>
              <div>
                <h3 className={`font-Dana text-sm ${
                  todo.completed 
                    ? "text-gray-400 line-through" 
                    : "text-gray-700"
                }`}>
                  {todo.title}
                </h3>
                <span className="text-xs text-gray-400 font-Dana">
                  {todo.date && new Date(todo.date).toLocaleTimeString('fa-IR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
            
            <button 
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(todo.id);
              }}
              className="text-gray-400 hover:text-amber-600 transition-colors p-1"
            >
              <IoTrash className="w-4 h-4" />
            </button>
          </li>
        ))}
        
        {sortedTodos.length === 0 && (
          <div className="p-4 text-center text-gray-400 font-Dana text-sm">
            موردی برای نمایش وجود ندارد
          </div>
        )}
      </ul>
    </div>
  );
};

export default TodosList;