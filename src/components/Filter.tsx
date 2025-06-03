const Filter = ()=>{

   return(
      <>
         <nav className="flex justify-around px-20 border-x border-b p-2  border-gray-300 font-DanaMedium text-gray-700">
            <button className="text-sm bg-orange-500 p-2 rounded-2xl w-20">همه</button>
            <button className="text-sm bg-orange-200 p-2 rounded-2xl w-20">انجام شده</button>
            <button className="text-sm bg-orange-200 p-2 rounded-2xl w-20" >فعال</button>
         </nav>
      </>
   )
}
export default Filter;