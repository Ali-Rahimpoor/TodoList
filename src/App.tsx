import AddTodo from "./components/AddTodo"
import Filter from "./components/Filter"
import TodosList from "./components/TodosList"
function App() {
  

  return (
    <>
    <header className="bg-zinc-700 py-8">
      <AddTodo/>
    </header>
    <main className="md:w-[500px] w-[80%] mx-auto">
        <TodosList/>
    </main>
    <footer className="md:w-[500px] w-[80%] mx-auto">
      <Filter/>
    </footer>
    </>
  )
}

export default App
