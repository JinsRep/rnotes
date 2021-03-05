import { createGlobalStyle } from "styled-components";

const gloablstyles = createGlobalStyle`

*{
    box-sizing:border-box;
}

body {
  margin: 0;
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

`;

export default gloablstyles;
