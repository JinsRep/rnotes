import logo from "./logo.svg";
import "./App.css";

import { ThemeProvider } from "styled-components";
import theme from "./theme/theme";
import NoteApp from "./components/NoteApp/NoteApp";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path={[
            "/",
            "/tag/:tag",
            "/color/:color",
            "/word/:word",
            "/tag/:tag/color/:color",
            "/tag/:tag/word/:word",
            "/color/:color/word/:word",
            "/tag/:tag/color/:color/word/:word",
            "/note/:id/:editorMode",
          ]}
          exact
          component={NoteApp}
        />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
