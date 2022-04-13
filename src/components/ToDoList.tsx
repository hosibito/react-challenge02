import { toUnicode } from "punycode";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import {  useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { Categorie, categoryState, IToDo, toDoState } from "../atoms";
import DragabbleBoard from "./DragabbleBoard";

const Container = styled.div`
  height: 95%;  
  width: 100%; 
  max-width: 100%;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Category = styled.div`
  height: 90%;
  width: 95%;
  background-color: ${(prop)=>prop.theme.headerBgColor};     
  display: flex;
  align-items: center; 
  padding: 1rem;
`;

function ToDoList() {
  const [categorys, setCategory] = useRecoilState(categoryState);
  const [toDos, setTodos] = useRecoilState(toDoState);

  
  const cateToDos = (category :string )  => {    
    return toDos.filter( (toDo) => toDo.category.text == category )
  }

  const cateIndex = (categoryText :string ) => {
    let cate = categorys.filter( (cate) => cate.text === categoryText )
    return cate[0].index
  }

  const onDragEnd = (info : DropResult) => {    
    const { destination, draggableId, source } = info;     

    if (!destination) return;  
    
    if (source.droppableId === "CategoryWrapper"){   
      // 카테고리 이동처리      
      if(source.index < (destination?.index as number)){
        // 앞에서 뒤로이동        
        setCategory((oldcatagories) => {           
          let newcates =[] as Categorie[];
          oldcatagories.map((cate) => {
            if(cate.index === source.index){
              let nnnnew = {
                text:cate.text,
                index:destination?.index as number
              }
              newcates.push(nnnnew)
            }else if(source.index < cate.index && cate.index <= (destination?.index as number) ){
              let nnnnew2 = {
                text:cate.text,
                index: cate.index - 1
              }
              newcates.push(nnnnew2)
            }else{
              newcates.push(cate)
            }
          })        
          newcates.sort((a,b)=> a.index - b.index )  
          return newcates  
        })
      
      }else if(source.index > (destination?.index as number)){
        // 뒤에서 앞으로 이동    
        setCategory((oldcatagories) => { 
          let copyoldcatagories = [...oldcatagories]
          
          let newcates =[] as Categorie[];
          copyoldcatagories.reverse().map((cate) => {           
            if(cate.index === source.index){
              let nnnnew = {
                text:cate.text,
                index:destination?.index as number
              }
              newcates.push(nnnnew)
            }else if( cate.index >= (destination?.index as number) && cate.index < source.index){
              let nnnnew2 = {
                text:cate.text,
                index: cate.index + 1
              }
              newcates.push(nnnnew2)
            }else{
              newcates.push(cate)
            }
          })        
          newcates.sort((a,b)=> a.index - b.index )  
          return newcates  
        })
      }else{
        // 들었다 놓은거
        return;
      }
    }else{
      //내부요소 이동처리
      if (source.droppableId === destination.droppableId){
        // 같은 카테고리 이동      
        if(source.index < (destination?.index as number)){
          // 앞에서 뒤로이동   
          setTodos((oldTodos)=>{
            let newTodos = [] as IToDo[];
            oldTodos.map((todo)=>{
              if(todo.category.text === destination.droppableId){
                //카테고리 같으면 이동처리
                if(source.index < (destination.index)){
                  //위에서 아래로 이동
                  if(todo.index === source.index){
                    let nnnnew = {
                      text:todo.text,
                      index:destination.index,
                      category:todo.category
                    }
                    newTodos.push(nnnnew)
                  }else if(source.index < todo.index && todo.index <= destination.index){
                    let nnnnew2 = {
                      text:todo.text,
                      index:todo.index - 1,
                      category:todo.category
                    }
                    newTodos.push(nnnnew2)
                  }else{
                    newTodos.push(todo)
                  }
                }
              }else{
                //카테고리 다르면 그냥 추가
                newTodos.push(todo)
              }
            })
            newTodos.sort((a,b) => a.index - b.index)
            return newTodos
          })
        }else if(source.index > destination.index){
          //뒤에서 앞으로 이동
          setTodos((oldTodos)=>{
            let copyOldTodos = [...oldTodos]
            let newTodos = [] as IToDo[];
            copyOldTodos.reverse().map((todo)=>{
              if(todo.category.text === destination.droppableId){
                //카테고리 같으면 이동처리 
                if(source.index > destination.index){
                  //아래에서 위로 이동
                  if(todo.index === source.index){
                    let nnnnew = {
                      text:todo.text,
                      index:destination.index,
                      category:todo.category
                    }
                    newTodos.push(nnnnew)
                  }else if(todo.index >= destination.index && todo.index < source.index){
                    let nnnnew2 = {
                      text:todo.text,
                      index:todo.index + 1,
                      category:todo.category
                    }
                    newTodos.push(nnnnew2)
                  }else{
                    newTodos.push(todo)
                  }
                }
              }else{
                //카테고리 다르면 그냥추가
                newTodos.push(todo)
              }
            })
            newTodos.sort((a,b) => a.index - b.index)
            return newTodos
          })
        }
      }else{
        // 다른 카테고리 이동     
        setTodos((oldTodos) =>{
          let newTodos = [] as IToDo[];
          oldTodos.map((todo)=>{
            if(source.droppableId === todo.category.text){
              //뺴온곳 처리
              if(todo.index === source.index){
                let nnnew = {
                  text:todo.text,
                  index:destination.index,
                  category: { text:destination.droppableId , index: cateIndex(destination.droppableId) }
                }
                newTodos.push(nnnew)
              }else if(todo.index > source.index){
                let nnnew2 = {
                  text:todo.text,
                  index:todo.index - 1,
                  category: todo.category
                }
                newTodos.push(nnnew2)
              }else{
                newTodos.push(todo)
              }
            }else if(destination.droppableId === todo.category.text){
              // 넣은곳 처리
              if(todo.index >= destination.index){
                let nnnew2 = {
                  text:todo.text,
                  index:todo.index + 1,
                  category: todo.category
                }
                newTodos.push(nnnew2)
              }else{
                newTodos.push(todo)
              }
              
            }else{
              newTodos.push(todo)
            }
          })
          newTodos.sort((a,b) => a.index - b.index)
          return newTodos
        })
      }
    }   
  };

  return (    
    <Container>   
      <DragDropContext onDragEnd={onDragEnd}>          
          <Droppable droppableId="CategoryWrapper" direction="horizontal" type="droppableItem">
            {(prov) => (
              <Category ref={prov.innerRef} {...prov.droppableProps}>
                {categorys.map((categori, index) => (
                    <DragabbleBoard key={index} categori={categori} cateToDos={cateToDos(categori.text)} index={categori.index}/>
                ))}
               {prov.placeholder}  
              </Category>
            )}
          </Droppable>    
      </DragDropContext>
    </Container>

  );
}

export default ToDoList;
