import Input from "./components/Input";
import TaskList from "./components/TasksList";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <>
      <main>
        <Input />
        <SearchBar />
        <TaskList />
      </main>
    </>
  );
};

export default App;
