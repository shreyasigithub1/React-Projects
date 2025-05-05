import { useState ,useContext} from "react";
import { toggleContext } from "./context";

function App() {
  const value = useContext(toggleContext);
  return (
    <>
      {value ? (
        <div className="cardDark">
          <h1>My App</h1>
          <p>This is a Dark card</p>
        </div>
      ) : (
        <div className="cardLight">
          <h1>My App</h1>
          <p>This is a Light  card</p>
        </div>
      )}
    </>
  );
}

export default App;
