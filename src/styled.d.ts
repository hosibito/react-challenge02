import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}

/**
  theme 는 styled-components 에서 제공하는 기능이므로 
  공식문서에 있는것을 가져와서 확장해주는개념이다. 
*/
