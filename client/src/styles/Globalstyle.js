import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
    ${reset}
    :root{
        --color-orange : #F48225;
        --color-blue : #0A95FF;
    }
    html {
        font-size:62.5%;
    }
    * {
        box-sizing: border-box;
    }
    #root {
        height: 75vh;
    }
    body{
    background: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    }
`;
