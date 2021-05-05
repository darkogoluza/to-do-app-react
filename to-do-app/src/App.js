import Input from "./components/Input";
import TaskList from "./components/TasksList";
import SearchBar from "./components/SearchBar";
import DropDownsContainer from "./components/DropDownsContainer";

const App = () => {
  return (
    <>
      <main>
        <Input />
        <DropDownsContainer />
        <SearchBar />
        <TaskList />
      </main>
    </>
  );
};

export default App;
