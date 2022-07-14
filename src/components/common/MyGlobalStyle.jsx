import { createGlobalStyle } from "styled-components";
import reset from "../../public/css/reset.css";

function MyGlobalStyle () {
  return <GlobalStyle />;
}

const GlobalStyle = createGlobalStyle`
${reset}; // Reset CSS

html, body {
  /* background-color: ${props => props.bgColor}; */
  background-color: #F6F5FB;
  font-weight: 500;
  font-size: 16px;
}

body, button, input, textarea {
  font-family: ${(props) => props.theme.fontFamily.default}, sans-serif;
  font-size: 16px;
}

a {
  text-decoration: none;
  color: inherit;
}
`;

export default MyGlobalStyle;