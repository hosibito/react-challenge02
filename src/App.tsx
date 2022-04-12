import { Reset } from "styled-reset";
import MyHeaders from "./components/MyHeader";
import ToDoList from "./components/ToDoList";


function App() {
  return (
    <>     
      <Reset/>
      <MyHeaders />
      <ToDoList />
    </>
  );
}

export default App;

