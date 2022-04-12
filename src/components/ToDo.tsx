import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, IToDo, toDoState } from "../atoms";

function ToDo({ text, category, id }: IToDo) {
    const categoris = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);

    const onClick = ( category :IToDo["category"]) =>{  
        setToDos((oldToDos) => {            
            const targetIndex = oldToDos.findIndex( (toDo) => toDo.id === id );
            const oldTodo = oldToDos[targetIndex];
            const newToDo = { text , id, category };     
            return [
                ...oldToDos.slice(0, targetIndex),
                newToDo,
                ...oldToDos.slice(targetIndex + 1),
            ];
        });
    };
    return (
        <li>
            <span> {text} </span>
            {
                categoris.map((c , index) => (
                    category.text !== c.text && (
                        <button key={index} onClick={ () => onClick( c ) } >
                            {c.text}
                        </button>
                    )
                ))
            }

       
        </li>        
    );
}

export default ToDo;
