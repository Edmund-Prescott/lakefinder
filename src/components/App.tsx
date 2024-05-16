import { useState } from "react";
import "../App.css";
import Address from "./Address.js";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>WA Fish Finder</h1>
      <div className="card">
        <Address></Address>
      </div>
    </div>
  );
}

export default App;
