import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./shared/theme";
import MyGlobalStyle from "./components/common/MyGlobalStyle";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MyGlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;