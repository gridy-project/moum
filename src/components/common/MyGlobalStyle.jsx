import { createGlobalStyle } from "styled-components";
import reset from "../../public/css/reset.css";
import { useSelector } from "react-redux";

function MyGlobalStyle () {
  const bgColor = useSelector((state) => state.option.backgroundColor);
  return <GlobalStyle bgColor={bgColor} />;
}

const GlobalStyle = createGlobalStyle`
${reset}; // Reset CSS

html, body {
  /* background-color: ${props => props.bgColor}; */
  background-color: #F6F5FB;
}

body, button, input, textarea {
  font-family: ${(props) => props.theme.fontFamily.default}, sans-serif;
}

a {
  text-decoration: none;
  color: inherit;
}
`;

export default MyGlobalStyle;