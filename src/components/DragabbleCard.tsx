import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IToDo } from "../atoms";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  margin-left: 2px;
  margin-right: 2px;
  padding: 10px;
  background-color: ${(props) =>
    props.isDragging ?  props.theme.headerBgColor: props.theme.headerBgColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px 2px 5px rgba(255, 0, 0, 0.05)" : "none"};
`;

interface IDragabbleCardProps {
  toDo: IToDo;
  index: number;
}

function DragabbleCard({ toDo }: IDragabbleCardProps) {
  return (      
    <Draggable draggableId={toDo.text} index={toDo.index}>
        {(prop, snapshot)=>(
            <Card 
                isDragging={snapshot.isDragging}
                ref={prop.innerRef}                      
                {...prop.draggableProps} 
                {...prop.dragHandleProps}
            >
                <span>{toDo.text}</span>
            </Card>
        )}
    </Draggable> 
  );
}

export default React.memo(DragabbleCard);

