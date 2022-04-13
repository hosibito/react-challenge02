import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState } from "../atoms";


const Form = styled.form`
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  input {
      
    font-size: 16px;
    border: 0;
    background-color: ${(prop) => prop.theme.btnBgColor};
    color: ${(prop) => prop.theme.textColor};
    &::placeholder{
        color:${(prop) => prop.theme.textColor};
        opacity: 0.7;
    }
    width: 80%;
    padding: 10px;
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

interface ICategorieForm{
    categorie: string;
}

function CreateCategorie(){
    const setCategorie = useSetRecoilState(categoryState);
    const{ register, handleSubmit, setValue} = useForm<ICategorieForm>();
    const handleValid = ( ({categorie} : ICategorieForm) =>{
        setCategorie((oldcates) => {
            let index = 0;
            oldcates.map((cate)=>{
                if(cate.index > index){
                    index=cate.index
                }                
            })
            index++

            let cateArr = [...oldcates, { text: categorie , index: index}]

            cateArr.sort((a,b)=> a.index - b.index )

            return cateArr  });

        setValue("categorie" , "");
    });
    
    return (
        <Form onSubmit={handleSubmit(handleValid)}>
            <input 
                {
                    ...register( "categorie" , { required: "등록하려면 카테고리를 입력하세요", } )
                }
                placeholder="Create Category"
            />        
        </Form>
    );
}

export default CreateCategorie;