import Router from "./Router";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./shared/theme";
import MyGlobalStyle from "./components/common/MyGlobalStyle";

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <MyGlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;