import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { categoryState, selectedCategory, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const selectedtoDos = useRecoilValue(toDoSelector);
  const categorys = useRecoilValue(categoryState);
  const [selectedcategory, setselectedcategory] = useRecoilState(selectedCategory);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {   
    setselectedcategory( { text: event.currentTarget.value} )
  };


  return (
    <div> 

      <select value={selectedcategory.text} onInput={onInput}>
        {
          categorys.map((c) => <option key={c.text} value={c.text} >{c.text}</option> )
        }
      </select>

      <CreateToDo />

      {selectedtoDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;

