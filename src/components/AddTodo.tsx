import { useState } from "react";
import { useDispatch } from "react-redux";
import { todoAdded } from "../features/todosSlice";
const AddTodo = ()=>{
   const dispatch = useDispatch();
   const [text,setText] = useState<string>('');

   const handleChange = (
      e:React.ChangeEvent<HTMLInputElement>)=>{
      setText(e.target.value);
   }

   const handleSubmit = (
      e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
         if(text.trim()){
         e.preventDefault();
         dispatch(todoAdded(text));
         setText('');
      }
   }
   return(
      <>
      <form className="md:w-[500px] w-[80%] text-white font-DanaBold mx-auto flex gap-2">
  <input
    type="text"
    placeholder="اضافه کردن تسک"
    value={text}
    onChange={handleChange}
    className="flex-1 px-4 py-2 border border-gray-300 bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  />
  <button
    onClick={handleSubmit}
    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    ثبت
  </button>
</form>
      </>
   )
}
export default AddTodo;