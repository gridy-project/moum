import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Popup from "components/Popup/Popup";
import Float from "components/Popup/Float";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;