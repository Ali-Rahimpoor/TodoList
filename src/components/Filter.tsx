import { setFilter } from "../features/FilterSlice";
import { useDispatch} from "react-redux";
const Filter = ()=>{

   const dispatch = useDispatch();

   const handleFilter = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
      e.preventDefault();
      dispatch(setFilter(e.currentTarget.name))
   }

   return(
      <>
         <nav className="flex justify-around px-20 border-x border-b p-2  border-gray-300 font-DanaMedium text-gray-700">
            <button onClick={handleFilter} name="all" className="text-sm bg-orange-500 p-2 rounded-2xl w-20">همه</button>
            <button onClick={handleFilter} name="complete" className="text-sm bg-orange-200 p-2 rounded-2xl w-20">انجام شده</button>
            <button onClick={handleFilter} name="active" className="text-sm bg-orange-200 p-2 rounded-2xl w-20" >فعال</button>
         </nav>
      </>
   )
}
export default Filter;