import { selectFilter, setFilter } from "../features/FilterSlice";
import { useDispatch, useSelector } from "react-redux";

const filteredButtons = [
   {name:"all",label:'همه',className:"bg-orange-500"},
   {name:"complete",label:'انجام شده',className:"bg-orange-500"},
   {name:"active",label:'فعال',className:"bg-orange-500"}
];

const Filter = ()=>{
   const dispatch = useDispatch();
   const currentFilter = useSelector(selectFilter);
   console.log(currentFilter);
   const handleFilter = (e: React.MouseEvent<HTMLButtonElement>)=>{
      e.preventDefault();
      dispatch(setFilter(e.currentTarget.name));
   }

   return (
    <nav className="flex justify-around px-20 border-x border-b p-2 border-gray-300 font-DanaMedium text-gray-700">
      {filteredButtons.map((button) => (
        <button
          key={button.name}
          onClick={handleFilter}
          name={button.name}
          className={`text-sm p-2 rounded-2xl w-20 ${currentFilter === button.name ? "bg-orange-500":"bg-orange-200"}`}
        >
          {button.label}
        </button>
      ))}
    </nav>
  );
}

export default Filter;