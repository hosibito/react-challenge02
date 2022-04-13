import { useRecoilValue } from "recoil";
import MyHeaders from "./components/MyHeader";
import ToDoList from "./components/ToDoList";

import { isDarkAtom } from './atoms';
import { darkTheme, lightTheme } from './theme';
import styled, { ThemeProvider } from "styled-components";

const OutBody = styled.div`
  width: 100vw;
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(prop) => prop.theme.bgColor };

`;

const InBody = styled.div`
  width: 95%;
  height: 95%;
  display: flex;
  flex-direction: column;
  border: 2px solid ${(prop) => prop.theme.textColor };
  background-color: ${(prop) => prop.theme.bgColor };
  color: ${(prop) => prop.theme.textColor};
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <OutBody>
        <InBody>
          <MyHeaders />
          <ToDoList />
        </InBody>
      </OutBody>
    </ThemeProvider>   
  );
}

export default App;

