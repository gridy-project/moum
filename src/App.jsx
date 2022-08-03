import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "styles/theme";
import GlobalStyle from "styles/GlobalStyle";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CookiesProvider>
        <GlobalStyle />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  );
}

export default App;