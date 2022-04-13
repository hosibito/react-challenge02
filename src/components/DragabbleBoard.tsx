import React, { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Categorie, IToDo } from "../atoms";
import CreateToDo from "./CreateToDo";
import DragabbleCard from "./DragabbleCard";

const Board = styled.div`
  margin: 1rem;
  height: 100%;
  width: 15%; 
  background-color:${(prop)=>prop.theme.bgColor};
  border-radius: 5px;
  display: flex;
  flex-direction: column;  
`;

const BoardTitle = styled.div`
  height: 5%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  background-color:${(prop)=>prop.theme.bgColor};
  padding: 0.3rem;
`;

const ToDoBoard = styled.div`
  padding-top: 0.3rem;
  height: 90%;  
`;

interface IDragabbleBoardProps{
    categori : Categorie;
    cateToDos : IToDo[];
    index: number;
}

function DragabbleBoard({ categori, cateToDos, index }: IDragabbleBoardProps) {   
    return (
        <Draggable draggableId={categori.text} index={index} key={categori.text}>
            {(prov) => (
                <Board  ref={prov.innerRef}                      
                    {...prov.draggableProps}                                 
                >
                    <BoardTitle                          
                    {...prov.dragHandleProps}>
                        {categori.text}
                    </BoardTitle>

                    <CreateToDo {...categori}/>
                
                    <Droppable droppableId={categori.text} direction="vertical"  type="droppableSubItem">
                        {(prov) => (
                            <ToDoBoard ref={prov.innerRef} {...prov.droppableProps}>     
                                {cateToDos.map((todo) => (                                
                                    <DragabbleCard toDo={todo} index={todo.index} key={todo.index}/> 
                                ))} 
                            {prov.placeholder}                                    
                            </ToDoBoard>                                 
                        )} 
                    </Droppable>   
                </Board>                        
            )}
        </Draggable>
    );
}
export default React.memo(DragabbleBoard);

