import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";

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