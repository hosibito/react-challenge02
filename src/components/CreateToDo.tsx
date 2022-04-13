import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categorie, toDoState } from "../atoms";


const Form = styled.form`
  height: 5%;
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 5px;
  
  input {        
    font-size: 15px;
    border: 0;
    background-color: ${(prop) => prop.theme.btnBgColor};
    color: ${(prop) => prop.theme.textColor};
    &::placeholder{
        color:${(prop) => prop.theme.textColor};
        opacity: 0.7;
    }
    width: 100%;
    padding: 5px;
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    &:focus{
        &::placeholder{
            opacity: 0;
        }
    }
  }

`;

interface IForm {
  toDo: string;
}

function CreateToDo( categori: Categorie ) {
  const [ toDos, setToDos ] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();  

  const handleValid = ({ toDo }: IForm) => {   
    const cateTados = toDos.filter((todo)=>{     
      return todo.category.text === categori.text
    })
    let index = 0;
    if (cateTados.length === 0){
      const index = 0;
    }
    else{      
      cateTados.map((todo) => {
        if (todo.index > index){
          index=todo.index
        }      
      })
      index++
    } 

    setToDos((oldToDos) =>{
      let toDosArr = [ { text: toDo, index: index, category: categori},...oldToDos,]
      toDosArr.sort((a,b)=> a.index - b.index )
      return toDosArr
    });
    
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder={`Add ${categori.text}`}
      />
    </Form>
  );
}

export default CreateToDo;
