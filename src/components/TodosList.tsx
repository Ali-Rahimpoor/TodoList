import { useDispatch, useSelector} from "react-redux";
import { todoToggled} from "../features/todosSlice";
import { todoRemoved } from "../features/todosSlice";
import { IoTrash } from "react-icons/io5";
import { usePersistTodos } from "../hooks/usePersistTodos";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Todo } from "../types/Ttodo";
import { selectFilteredTodos } from "../features/FilterSlice";
const TodosList = ()=>{
   const dispatch = useDispatch();

   const todos = usePersistTodos();
   
   const handleDelete = (id: string)=>{
      dispatch(todoRemoved(id));
   }
   const handleToggle = (id:string)=>{
    dispatch(todoToggled(id));
   }
   const checkboxRef = useRef<HTMLInputElement>(null);
   
   const filteredTodos = useSelector(selectFilteredTodos);

   const sortedTodos = useMemo(()=>{
      const isChecked = checkboxRef.current?.checked;
      return [...todos].sort((a,b)=>{
         return isChecked
         ? new Date (b.date).getTime() - new Date (a.date).getTime()
         : new Date (a.date).getTime() - new Date (b.date).getTime()
      });
   },[todos,checkboxRef.current?.checked,]);

   console.log(filteredTodos);
   return(
      <>
      <ul className="font-Dana mt-1 border border-gray-300 h-100 overflow-y-scroll">
         <label htmlFor="sort">مرتب سازی بر اساس جدید ترین ها</label>
         <input type="checkbox" id="sort" ref={checkboxRef}/>
  {filteredTodos.map(todo => (
    <li 
      key={todo.id}
      className={`px-4 py-3 my-1 mx-2 rounded shadow-sm hover:shadow-md transition-shadow flex justify-between cursor-pointer ${todo.completed ? "bg-amber-100 text-gray-400 line-through" :"text-gray-700"}`}
      onClick={()=>handleToggle(todo.id)}
    >
      <span>  {todo.date ? new Date(todo.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
     <h1>{todo.title}</h1>
       <IoTrash onClick={()=>handleDelete(todo.id)} className="size-5 text-amber-600 hover:text-amber-900"/>
    </li>
  ))}
</ul>
      </>
   )
}
export default TodosList;