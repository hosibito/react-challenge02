import { useRecoilState } from "recoil";
import styled from "styled-components"
import { isDarkAtom } from "../atoms";
import CreateCategorie from "./CreateCategorie"

const Container= styled.div`
    display: flex;
    margin: 1rem;
    width: 100%;
    height: 5%;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.div`
    width: 40%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.accentColor};
`;

const ThemeBtn = styled.div`
    width: 30%;
    margin-right: rem;
    font-size: 1.5rem;
    :hover{
        color:${(props) => props.theme.accentColor};
        cursor: pointer;
    }
`;

function MyHeaders() {
    const [ IsDark, setThemeIsDark] = useRecoilState(isDarkAtom) 
    const toggleThemeIsDark = () => setThemeIsDark((prev) => !prev)
    return (
        <Container>                
            <CreateCategorie />   
            <Title>To Dos</Title>
            <ThemeBtn onClick={toggleThemeIsDark}>change Theme : {IsDark ? "Dark" :"Light"}</ThemeBtn >        
           
        </Container>

      
    )
}
export default MyHeaders