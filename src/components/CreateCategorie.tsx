import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { categoryState } from "../atoms";

interface ICategorieForm{
    categorie: string;
}

function CreateCategorie(){
    const setCategorie = useSetRecoilState(categoryState);
    const{ register, handleSubmit, setValue} = useForm<ICategorieForm>();
    const handleValid = ( ({categorie} : ICategorieForm) =>{
        setCategorie((oldcates) => [...oldcates, { text: categorie }]  );
        setValue("categorie" , "");
    });
    
    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input 
                {
                    ...register( "categorie" , { required: "등록하려면 카테고리를 입력하세요", } )
                }
                placeholder="Create Category"
            />
            <button>CreateCategorie</button>
        </form>
    );
}

export default CreateCategorie;