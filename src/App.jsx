import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./shared/theme";
import MyGlobalStyle from "./components/common/MyGlobalStyle";
import { BrowserRouter } from "react-router-dom";
import Popup from "./components/popup/Popup";
import Float from "./components/popup/Float";
import { removeToken } from "./shared/localStorage";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Popup />
      <Float />
      <MyGlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;