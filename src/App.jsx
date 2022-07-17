import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Popup from "./components/popup/Popup";
import Float from "./components/popup/Float";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Popup />
      <Float />
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;