import { useState } from "react";
import App from "./App"
import { toggleContext } from "./context";

function Toggle() {
  const [theme, setTheme] = useState(false);
    function handleButton() {
        if (theme) {
            setTheme(false);
        } else {
            setTheme(true);
        }
  }
  return (
    <>
          <button onClick={handleButton}>{theme ? "Dark" : "Light"}</button>
          <toggleContext.Provider value={theme}>
          <App />
          </toggleContext.Provider>
         
    </>
  );
}

export default Toggle;
